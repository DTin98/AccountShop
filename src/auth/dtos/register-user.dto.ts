import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class RegisterUserDto extends CreateUserDto {
  @ApiProperty({ example: 'abc@gmail.com', description: 'The email of user' })
  username: string;

  @ApiProperty({ example: 'kennySang', description: 'The username of user' })
  password: string;

  @ApiProperty({
    example: 'kennySang@gmail.com',
    description: 'The email of user',
  })
  email: string;

  @ApiProperty({
    example: '0986778899',
    description: 'The phone number of user',
  })
  phone: string;
}
