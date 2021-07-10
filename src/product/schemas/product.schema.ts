import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { Country } from "src/country/schemas/country.schema";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ require: true })
  data: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Country" })
  country: Country | string;

  @Prop({ default: true })
  publish: boolean;

  @Prop({ default: false, index: 1 })
  isUsed: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
