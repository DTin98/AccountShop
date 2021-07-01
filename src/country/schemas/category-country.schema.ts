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
import { Exclude } from "class-transformer";
import { Product } from "src/product/schemas/product.schema";
import { Category } from "src/category/schemas/category.schema";
import { Country } from "./country.schema";

export type CategoryCountryDocument = CategoryCountry & Document;

@Schema()
export class CategoryCountry {
  @Prop({ default: 0 })
  unitPrice: number;

  @Prop({ default: 0 })
  quality: number;

  @Prop()
  describe: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Country" })
  country: Country;
}

export const CategoryCountrySchema =
  SchemaFactory.createForClass(CategoryCountry);
