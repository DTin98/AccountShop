import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { LoginUserDto } from "./auth/dtos/login-user.dto";
import { RegisterUserDto } from "./auth/dtos/register-user.dto";
import { Public } from "./shared/decorators/public.decorator";
import { Roles } from "./shared/decorators/role.decorator";
import { Role } from "./users/enums/role.enum";
import { ApiProperty, ApiResponse } from "@nestjs/swagger";
import { LoginResult } from "./auth/interfaces/login-result.interface";
import { User } from "./users/schemas/user.schema";
import { RegisterResult } from "./auth/interfaces/register-result.interface";
import { AppService } from "./app.service";
import { AdminBankInfo } from "./shared/interfaces/admin-bank-info.interface";

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService
  ) {}

  @Public()
  @Post("auth/login")
  @ApiResponse({
    status: 200,
    type: LoginResult,
    description: "Creates new token",
  })
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResult> {
    return this.authService.login(loginUserDto);
  }

  @Public()
  @Post("auth/register")
  @ApiResponse({
    status: 201,
    type: RegisterResult,
    description: "Creates new user",
  })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Get()
  @Roles(Role.Admin)
  getString(): string {
    return "this is HomePage";
  }

  @Public()
  @Get("html")
  getHTML() {
    return "<html><h1>Hello World</h1></html>";
  }

  @Get("admin/bank-info")
  getAdminBankInfo(@Req() req): Promise<AdminBankInfo> {
    const { userId } = req.user;
    return this.appService.getAdminBankInfo(userId);
  }
}
