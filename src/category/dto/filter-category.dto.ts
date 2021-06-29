import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsOptional } from "class-validator";
import { SORT_TYPE } from "src/shared/constants/pagination.constant";

export class categoryFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  page: string;

  @ApiPropertyOptional()
  @IsOptional()
  limit: string;

  @ApiPropertyOptional()
  @IsOptional()
  skip: number;

  @IsOptional()
  @ApiPropertyOptional()
  sortField: string;

  @IsOptional()
  @Transform((sortOrder) => sortOrder.value.toUpperCase())
  @IsEnum(SORT_TYPE)
  @ApiPropertyOptional()
  sortOrder: SORT_TYPE;

  @IsOptional()
  @ApiPropertyOptional()
  name: string;
}
