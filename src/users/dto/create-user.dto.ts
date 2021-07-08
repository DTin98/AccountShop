import { IsNotEmpty, IsString } from "class-validator";
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

  @IsNotEmpty()
  @IsString()
  balance: number;

  @IsNotEmpty()
  @IsString()
  role: string;
}
