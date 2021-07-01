import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { Public } from "src/shared/decorators/public.decorator";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";
import { CountryService } from "./country.service";
import { CreateCountryDto } from "./dtos/create-country.dto";
import { CountryFilterDto } from "./dtos/filter-country.dto";
import { UpdateCountryDto } from "./dtos/update-country.dto";
import { Country } from "./schemas/country.schema";

@Controller("country")
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  create(@Body() createCountryDto: CreateCountryDto): Promise<Country> {
    return this.countryService.create(createCountryDto);
  }

  @Public()
  @Get()
  findAll(@Query() filter: CountryFilterDto): Promise<PaginateResult<Country>> {
    return this.countryService.findAll(filter);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.countryService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countryService.update(id, updateCountryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.countryService.remove(id);
  }
}
