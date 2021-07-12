import { SetMetadata } from "@nestjs/common";
import { Role } from "../../users/enums/role.enum";

export const API_KEY = "API_KEY";
export const Roles = (...roles: Role[]) => SetMetadata(API_KEY, roles);
