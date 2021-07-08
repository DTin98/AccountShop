import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IsNotEmpty, IsEmail, IsString, IsNumber } from "class-validator";
import { Role } from "src/users/enums/role.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export type UserDocument = User & Document;

@Schema()
export class User {
  readonly _id?: string;
  readonly _doc?: any; //get from model object Mongoose

  @Prop({ require: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Prop({ require: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @Prop({ require: true })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Prop({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Transform((balance) => parseInt(balance.value))
  balance: number;

  @Prop({ require: true })
  @IsNotEmpty()
  password: string;

  @Prop({ require: true, default: [Role.User] })
  role: Role[];

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: null })
  verificationCode: number;

  @Prop({ default: null })
  transferContent: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
