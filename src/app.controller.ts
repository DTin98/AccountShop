import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LoginUserDto } from './auth/dtos/login-user.dto';
import { RegisterUserDto } from './auth/dtos/register-user.dto';
import { Public } from './shared/decorators/public.decorator';
import { Roles } from './shared/decorators/role.decorator';
import { Role } from './users/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('auth/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Public()
  @Post('auth/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Get()
  @Roles(Role.Admin)
  getString(): string {
    return 'this is HomePage';
  }

  @Public()
  @Get('html')
  getHTML() {
    return '<html><h1>Hello World</h1></html>';
  }
}
