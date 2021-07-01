import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

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
}
