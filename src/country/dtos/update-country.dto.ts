import { Transform } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsMongoId,
} from "class-validator";

export class UpdateCountryDto {
  @IsOptional()
  @IsString()
  @Transform((countryCode) => countryCode.value.toUpperCase())
  countryCode: string;

  @IsOptional()
  @IsString()
  countryName: string;

  @IsOptional()
  @IsNumber()
  unitPrice: number;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  describe: string;

  @IsOptional()
  @IsBoolean()
  isPublished: boolean;

  @IsOptional()
  @IsMongoId()
  category: string;
}
