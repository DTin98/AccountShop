import { PartialType } from '@nestjs/mapped-types';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(User) {}
