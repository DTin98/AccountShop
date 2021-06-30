import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isEmpty } from "class-validator";
import { Model } from "mongoose";
import {
  PAGINATE_DEFAULT,
  SORT_TYPE,
} from "src/shared/constants/pagination.constant";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";
import { getFilterQueries } from "src/utils/getFilterQueries";
import { CreateProductDto } from "./dtos/create-product.dto";
import { ProductFilterDto } from "./dtos/filter-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { Product, ProductDocument } from "./schemas/product.schema";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const isExistedProduct = await this.productModel.findOne({
      data: createProductDto.data,
    });
    if (isExistedProduct)
      throw new BadRequestException("product's data is existed");

    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  //NOT YET INSERT OPTION FOR QUERIES
  async findAll(filter: ProductFilterDto): Promise<PaginateResult<Product>> {
    const { pageSize, page, skip } = getFilterQueries(filter);

    const productLst = await this.productModel
      .find()
      .limit(pageSize)
      .skip(skip)
      .exec();

    return {
      data: productLst,
      total: productLst.length,
      page,
    };
  }
}
