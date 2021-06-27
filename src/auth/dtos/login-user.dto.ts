import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsEmail, IsString, IsNumber } from 'class-validator';

export class LoginUserDto extends PickType(CreateUserDto, [
  'username',
  'password',
] as const) {}
