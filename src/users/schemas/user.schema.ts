import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsNotEmpty, IsEmail, IsString, IsNumber } from 'class-validator';
import { Role } from 'src/users/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  readonly _id?: string;
  readonly _doc?: any; //get from model object Mongoose

  @ApiProperty({ example: 'abc@gmail.com', description: 'The email of user' })
  @Prop({ require: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'kennySang', description: 'The username of user' })
  @Prop({ require: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: '0986114478',
    description: 'The phone number of user',
  })
  @Prop({ require: true })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Prop({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @ApiProperty({ example: '123456', description: 'The password of user' })
  @Prop({ require: true })
  @IsNotEmpty()
  password: string;

  @Prop({ default: [Role.User] })
  role: Role[];

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: null })
  verificationCode: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
