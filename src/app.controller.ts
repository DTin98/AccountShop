import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Render,
  Req,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
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
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateAdminBankInfoDto } from "./shared/dtos/update-admin-bank-info.dto";
import { UpdateHeaderHTMLDto } from "./shared/dtos/update-header-html.dto";

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
    return this.appService.getHTML();
  }

  @Put("html")
  @Roles(Role.Admin)
  // @UseInterceptors(FileInterceptor("file"))
  updateHTML(@Body() updateHeaderHTMLDto: UpdateHeaderHTMLDto): string {
    return this.appService.updateHTML(updateHeaderHTMLDto);
  }

  @Get("admin/bank-info")
  getAdminBankInfo(@Req() req): Promise<AdminBankInfo> {
    const { username } = req.user;
    return this.appService.getAdminBankInfo(username);
  }

  @Put("admin/bank-info")
  @Roles(Role.Admin)
  updateAdminBankInfo(@Body() updateAdminBankInfoDto: UpdateAdminBankInfoDto) {
    return this.appService.updateAdminBankInfo(updateAdminBankInfoDto);
  }
}
