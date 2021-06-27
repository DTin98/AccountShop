import { OmitType } from '@nestjs/mapped-types';
import { User } from '../schemas/user.schema';

export class CreateUserDto extends OmitType(User, ['balance'] as const) {}
