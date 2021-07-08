import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsMongoId, IsOptional, IsString, IsUUID } from "class-validator";
import { FilterDto } from "src/shared/dtos/filter.dto";
import { Role } from "../enums/role.enum";

export class FilterUserDto extends FilterDto {
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  balance: number;
}
