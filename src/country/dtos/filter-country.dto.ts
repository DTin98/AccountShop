import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsMongoId, IsOptional, IsUUID } from "class-validator";
import { FilterDto } from "src/shared/dtos/filter.dto";

export class CountryFilterDto extends FilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  category: string;
}
