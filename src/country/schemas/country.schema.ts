import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { Product } from "src/product/schemas/product.schema";
import { Category } from "src/category/schemas/category.schema";

export type CountryDocument = Country & Document;

//"AU","CZ","EE","ES","FR","GB","IN","IT","KZ","LT","MY","PL","RU","TH","UA","US",
@Schema()
export class Country {
  @Prop({ require: true })
  countryCode: string;

  @Prop({ require: true })
  countryName: string;

  @Prop()
  image: string;

  @Prop({ default: 0 })
  unitPrice: number;

  @Prop({ default: 0 })
  quality: number;

  @Prop({ default: true })
  isPublished: boolean;

  @Prop()
  describe: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Product" })
  product: Product[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
  category: Category | string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
