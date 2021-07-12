import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "../enums/role.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  balance?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  role?: string;
}
