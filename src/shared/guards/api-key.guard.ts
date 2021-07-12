import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../../users/enums/role.enum";
import { ROLES_KEY } from "../decorators/role.decorator";
import { UsersService } from "../../users/users.service";

@Injectable()
export class apiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params } = context.switchToHttp().getRequest();
    const { api_key } = params;
    if (!api_key) return false;

    const foundApiKey = await this.userService.findApiKey(api_key);
    if (!foundApiKey) return false;

    return true;
  }
}
