import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Param,
} from "@nestjs/common";
import { Public } from "src/shared/decorators/public.decorator";
import { Roles } from "src/shared/decorators/role.decorator";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";
import { Role } from "src/users/enums/role.enum";
import { CountryService } from "./country.service";
import { CreateCountryDto } from "./dtos/create-country.dto";
import { FilterCountryDto } from "./dtos/filter-country.dto";
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
  findAll(@Query() filter: FilterCountryDto): Promise<PaginateResult<Country>> {
    return this.countryService.findAll(filter);
  }

  @Delete(":id")
  @Roles(Role.Admin)
  delete(@Param("id") id: string): Promise<Country> {
    return this.countryService.delete(id);
  }
}
