import { SetMetadata } from "@nestjs/common";
import { Role } from "../../users/enums/role.enum";

export const API_KEY = "API_KEY";
export const ApiKey = (apiKey: string) => SetMetadata(API_KEY, apiKey);
