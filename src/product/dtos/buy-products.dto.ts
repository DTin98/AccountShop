import { Transform } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsNumber,
} from "class-validator";

export class BuyProductsDto {
  @IsNotEmpty()
  @IsMongoId()
  country: string;

  // @IsNotEmpty()
  @IsOptional()
  @IsMongoId()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
