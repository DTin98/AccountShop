import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";
import { getFilterQueries } from "src/utils/getFilterQueries";
import { CreateCountryDto } from "./dtos/create-country.dto";
import { FilterCountryDto } from "./dtos/filter-country.dto";
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

    return {
      data: countryLst,
      totalPage: Math.ceil(countryCount / pageSize),
      page,
    };
  }
}
