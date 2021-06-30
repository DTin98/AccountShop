import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateCountryDto {
  @IsNotEmpty()
  @IsString()
  countryCode: string;

  @IsNotEmpty()
  @IsString()
  countryName: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  describe: string;
}
