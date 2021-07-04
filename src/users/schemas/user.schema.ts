import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IsNotEmpty, IsEmail, IsString, IsNumber } from "class-validator";
import { Role } from "src/users/enums/role.enum";
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = User & Document;

@Schema()
export class User {
  readonly _id?: string;
  readonly _doc?: any; //get from model object Mongoose

  @Prop({ require: true })
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: "abc@gmail.com", description: "The email of user" })
  email: string;

  @Prop({ require: true })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "abc", description: "The username of user" })
  username: string;

  @Prop({ require: true })
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "0986114478",
    description: "The phone number of user",
  })
  phone: string;

  @Prop({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @Prop({ require: true })
  @IsNotEmpty()
  password: string;

  @Prop({ default: [Role.User] })
  role: Role[];

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: null })
  verificationCode: number;

  @Prop({ default: null })
  transferContent: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
