import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { FilterDto } from "src/shared/dtos/filter.dto";

export class CountryFilterDto extends FilterDto {}
