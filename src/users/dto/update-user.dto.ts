import { PartialType } from "@nestjs/mapped-types";
import { OmitType } from "@nestjs/swagger";
import { Role } from "../enums/role.enum";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ["role"])
) {
  isVerified?: boolean;
  verificationCode?: number;
}
