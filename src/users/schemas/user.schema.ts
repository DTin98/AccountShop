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

  @Prop({ require: true })
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'abc@gmail.com', description: 'The email of user' })
  email: string;

  @Prop({ require: true })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'abc', description: 'The username of user' })
  username: string;

  @Prop({ require: true })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '0986114478',
    description: 'The phone number of user',
  })
  phone: string;

  @Prop({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 100, description: 'The balance of user' })
  balance: number;

  @Prop({ require: true })
  @IsNotEmpty()
  @ApiProperty({ example: '123456', description: 'The password of user' })
  password: string;

  @Prop({ default: [Role.User] })
  @ApiProperty({ example: ['user'], description: 'The role of user' })
  role: Role[];

  @Prop({ default: false })
  @ApiProperty({
    example: true,
    description: 'The verification status of user',
  })
  isVerified: boolean;

  @Prop({ default: null })
  verificationCode: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
