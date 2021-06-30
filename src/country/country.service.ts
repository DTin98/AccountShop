import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";
import { getFilterQueries } from "src/utils/getFilterQueries";
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
    const isExistedCountry = await this.countryModel.findOne({
      countryCode: createCountryDto.countryCode,
    });
    if (isExistedCountry)
      throw new BadRequestException("category code is existed");

    const createdCountry = new this.countryModel(createCountryDto);
    return createdCountry.save();
  }

  async findAll(filter: CountryFilterDto): Promise<PaginateResult<Country>> {
    const { pageSize, page, skip } = getFilterQueries(filter);

    const countryLst = await this.countryModel
      .find()
      .limit(pageSize)
      .skip(skip)
      .exec();

    return {
      data: countryLst,
      total: countryLst.length,
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
