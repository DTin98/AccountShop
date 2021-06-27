import { Body, Controller, Get, Post } from "@nestjs/common";
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

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

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
  getHTML() {
    return "<html><h1>Hello World</h1></html>";
  }
}
