import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsEnum,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/category/schemas/category.schema";
import { Exclude } from "class-transformer";
import { Country } from "src/country/schemas/country.schema";
import { User } from "src/users/schemas/user.schema";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ require: true })
  data: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Country" })
  country: Country | string;

  @Prop({ default: true })
  @Exclude()
  publish: boolean;

  @Prop({ default: false, index: 1 })
  @Exclude()
  isUsed: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
