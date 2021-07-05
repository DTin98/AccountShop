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
import { LoginResponse } from "./auth/interfaces/login-response.interface";
import { User } from "./users/schemas/user.schema";
import { RegisterResponse } from "./auth/interfaces/register-response.interface";
import { AppService } from "./app.service";
import { AdminBankInfo } from "./shared/interfaces/admin-bank-info.interface";
import { FileInterceptor } from "@nestjs/platform-express";

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
    type: LoginResponse,
    description: "Creates new token",
  })
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return this.authService.login(loginUserDto);
  }

  @Public()
  @Post("auth/register")
  @ApiResponse({
    status: 201,
    type: RegisterResponse,
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
  @Render("header")
  getHTML() {
    return { title: "header" };
  }

  @Put("html")
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor("file"))
  updateHTML(@UploadedFile() file: Express.Multer.File): string {
    return this.appService.updateHTML(file.buffer.toString());
  }

  @Get("admin/bank-info")
  getAdminBankInfo(@Req() req): Promise<AdminBankInfo> {
    const { userId } = req.user;
    return this.appService.getAdminBankInfo(userId);
  }
}
