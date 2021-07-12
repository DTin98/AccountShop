import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "src/product/schemas/product.schema";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";
import { getFilterQueries } from "src/utils/getFilterQueries";
import { CreateCountryDto } from "./dtos/create-country.dto";
import { FilterCountryDto } from "./dtos/filter-country.dto";
import { UpdateCountryDto } from "./dtos/update-country.dto";
import { Country, CountryDocument } from "./schemas/country.schema";

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async create(createCountryDto: CreateCountryDto) {
    const isExistedCountry = await this.countryModel
      .findOne({
        countryCode: createCountryDto.countryCode,
      })
      .select("_id")
      .lean()
      .exec();
    if (isExistedCountry)
      throw new BadRequestException("category code is existed");

    const createdCountry = new this.countryModel(createCountryDto);
    return createdCountry.save();
  }

  async findAll(filter: FilterCountryDto): Promise<PaginateResult<Country>> {
    const { pageSize, page, skip } = getFilterQueries(filter);

    const countryCount = await this.countryModel
      .countDocuments({ category: filter.category })
      .select("_id")
      .exec();

    const countryLst = await this.countryModel
      .find({ category: filter.category })
      .select("-category")
      .limit(pageSize)
      .skip(skip)
      .exec();

    // const quantity = await this.productModel
    //   .count({ country: "60dcc12eaf248a451fcc2a5e" })
    //   .select("_id")
    //   .exec();

    // const countryData = countryLst.map((c) => {
    //   return { ...c.toJSON(), quantity: quantity };
    // });

    return {
      data: countryLst,
      totalPage: Math.ceil(countryCount / pageSize),
      page,
    };
  }

  async updateQuantity(id: string): Promise<Country> {
    const quantity = await this.productModel
      .countDocuments({ country: id, isUsed: false })
      .select("_id")
      .lean()
      .exec();

    await this.countryModel.updateOne(
      { _id: id },
      { $set: { quantity: quantity } }
    );
    return this.countryModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<Country> {
    const foundCountry = await this.countryModel.findOne({ _id: id });
    if (!foundCountry)
      throw new BadRequestException("country id " + id + " is not found");
    await this.countryModel.deleteOne({ _id: id });
    return foundCountry;
  }

  async patch(
    id: string,
    updateCountryDto: UpdateCountryDto
  ): Promise<Country> {
    const foundCountry = await this.countryModel.findOne({ _id: id });
    if (!foundCountry)
      throw new BadRequestException("country id " + id + " is not found");
    await this.countryModel.updateOne(
      { _id: id },
      { $set: { ...updateCountryDto } }
    );
    return this.countryModel.findOne({ _id: id });
  }
}
