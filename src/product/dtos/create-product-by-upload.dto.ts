import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateProductByUploadDto {
  @IsNotEmpty()
  @IsMongoId()
  country: string;
}
