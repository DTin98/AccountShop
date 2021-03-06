import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  data: string;

  @IsNotEmpty()
  @IsMongoId()
  country: string;
}
