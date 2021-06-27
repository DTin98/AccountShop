import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsEmail, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto extends PickType(CreateUserDto, [
  'username',
  'password',
] as const) {
  @ApiProperty({ example: 'abc@gmail.com', description: 'The email of user' })
  username: string;

  @ApiProperty({ example: 'kennySang', description: 'The username of user' })
  password: string;
}
