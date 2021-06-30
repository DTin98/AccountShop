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

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ require: true })
  data: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Country" })
  country: Country;

  @Prop({ default: true })
  @Exclude()
  publish: boolean;

  @Prop({ default: false })
  @Exclude()
  isUsed: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
