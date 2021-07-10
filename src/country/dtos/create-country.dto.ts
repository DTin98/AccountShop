import { Transform } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsMongoId,
} from "class-validator";

export class CreateCountryDto {
  @IsNotEmpty()
  @IsString()
  @Transform((countryCode) => countryCode.value.toUpperCase())
  countryCode: string;

  @IsNotEmpty()
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

  @IsMongoId()
  category: string;
}
