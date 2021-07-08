import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Country } from "src/country/schemas/country.schema";
import { Product } from "src/product/schemas/product.schema";
import { User } from "src/users/schemas/user.schema";

export class CreatePaymentDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsMongoId()
  products: string;

  @IsNotEmpty()
  @IsMongoId()
  user: string;
}
