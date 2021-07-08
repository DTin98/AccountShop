import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { SORT_TYPE } from "src/shared/constants/pagination.constant";

export class UpdateHeaderHTMLDto {
  @IsString()
  file: string;
}
