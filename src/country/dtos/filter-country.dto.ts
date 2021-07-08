import { IsMongoId, IsOptional, IsUUID } from "class-validator";
import { FilterDto } from "src/shared/dtos/filter.dto";

export class FilterCountryDto extends FilterDto {
  @IsOptional()
  @IsMongoId()
  category: string;
}
