import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsEnum,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/product/schemas/product.schema";
import { Country } from "src/country/schemas/country.schema";

export type CategoryDocument = Category & Document;
@Schema()
export class Category {
  @Prop({ require: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Country" })
  product: Product[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
