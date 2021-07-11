import { BadRequestException, Injectable, Req } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isEmpty } from "class-validator";
import { Model } from "mongoose";
import * as mongoose from "mongoose";
import {
  PAGINATE_DEFAULT,
  SORT_TYPE,
} from "src/shared/constants/pagination.constant";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";
import { User, UserDocument } from "src/users/schemas/user.schema";
import { getFilterQueries } from "src/utils/getFilterQueries";
import { BuyProductsDto } from "./dtos/buy-products.dto";
import { CreateProductDto } from "./dtos/create-product.dto";
import { FilterProductDto } from "./dtos/filter-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { Product, ProductDocument } from "./schemas/product.schema";
import { Country, CountryDocument } from "src/country/schemas/country.schema";
import { Payment, PaymentDocument } from "src/payment/schemas/payment.schema";
import { CountryService } from "src/country/country.service";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private countryService: CountryService
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const isExistedProduct = await this.productModel
      .findOne({
        data: createProductDto.data,
      })
      .lean()
      .exec();
    if (isExistedProduct)
      throw new BadRequestException("product's data is existed");

    const createdProduct = new this.productModel(createProductDto);
    await this.countryService.updateQuantity(createProductDto.country);
    return createdProduct.save();
  }

  async findAll(filter: FilterProductDto): Promise<PaginateResult<Product>> {
    const { pageSize, page, skip } = getFilterQueries(filter);

    const productCount = await this.productModel.countDocuments().exec();

    const productLst = await this.productModel
      .find()
      .limit(pageSize)
      .skip(skip)
      .exec();

    return {
      data: productLst,
      totalPage: Math.ceil(productCount / pageSize),
      page,
    };
  }

  async buyProducts(
    userId: string,
    buyProductsDto: BuyProductsDto
  ): Promise<Product[]> {
    const { country, quantity } = buyProductsDto;
    const { unitPrice, describe, category } = await this.countryModel
      .findOne({ _id: country })
      .populate({ path: "category", select: "name" })
      .lean()
      .exec();
    const totalAmount = unitPrice * quantity;

    const isUserEnoughBalance = await this.userModel
      .findOne({
        _id: userId,
        balance: { $gte: totalAmount },
      })
      .select("balance")
      .lean()
      .exec();

    if (!isUserEnoughBalance)
      throw new BadRequestException("user is not enough balance");
    const userBalance = isUserEnoughBalance.balance;

    const foundProducts = await this.productModel
      .find({
        country: country,
        isUsed: false,
      })
      .select("data")
      .lean()
      .limit(quantity)
      .exec();

    const updatedFoundProducts = await this.productModel
      .updateMany(
        {
          country: country,
          isUsed: false,
          _id: { $in: [...foundProducts.map((p) => p._id)] },
        },
        {
          isUsed: true,
        }
      )
      .lean()
      .exec();

    const updatedCountryQuantity = await this.countryService.updateQuantity(
      country
    );

    const afterBalance = userBalance - totalAmount;
    const updatedUserBalance = await this.userModel
      .updateMany({ _id: userId }, { balance: afterBalance })
      .lean()
      .exec();

    new this.paymentModel({
      describe: describe,
      categoryName: category["name"],
      owner: userId,
      totalAmount: totalAmount,
      quantity: quantity,
      products: [...foundProducts.map((p) => p._id)],
    }).save();

    return foundProducts;
  }

  async createProductsByFile(countryId: string, file: Express.Multer.File) {
    let count = 0;
    let j = 0;
    let manyData = [];
    for (let i = 0; i < file.size; i++) {
      if (file.buffer[i] === Buffer.from("\n")[0]) {
        const data = file.buffer.slice(j, i).toString();
        if (data) {
          manyData.push({ data: data });
          count++;
        }
        j = i + 1;
      }
    }
    console.log(manyData.length);
    this.productModel.insertMany(manyData);
    this.countryService.updateQuantity(countryId);
    return { ok: true };
  }
}
