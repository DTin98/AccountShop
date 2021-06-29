import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsEnum,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export type CategoryDocument = Category & Document;

//"AU","CZ","EE","ES","FR","GB","IN","IT","KZ","LT","MY","PL","RU","TH","UA","US",
@Schema()
export class Category {
  @Prop({ require: true })
  @ApiProperty({
    example: "abc@gmail.com",
    description: "The email of Category",
  })
  countryCode: string;

  @Prop({ require: true })
  countryName: string;

  @Prop()
  image: string;

  @Prop()
  describe: string;

  @Prop({ default: 0 })
  quantity: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
