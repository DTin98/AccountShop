import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "src/product/schemas/product.schema";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";
import { User, UserDocument } from "src/users/schemas/user.schema";
import { getFilterQueries } from "src/utils/getFilterQueries";
import { BuyProductsDto } from "../product/dtos/buy-products.dto";
import { CreateCountryDto } from "./dtos/create-country.dto";
import { CountryFilterDto } from "./dtos/filter-country.dto";
import { UpdateCountryDto } from "./dtos/update-country.dto";
import { Country, CountryDocument } from "./schemas/country.schema";

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>
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

  async findAll(filter: CountryFilterDto): Promise<PaginateResult<Country>> {
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

    return {
      data: countryLst,
      totalPage: Math.ceil(countryCount / pageSize),
      page,
    };
  }

  findOne(id: string) {
    return `This action returns a #${id} country`;
  }

  update(id: string, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: string) {
    return `This action removes a #${id} country`;
  }
}
