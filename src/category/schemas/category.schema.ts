import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";

export type CategoryDocument = Category & Document;
@Schema()
export class Category {
  @Prop({ require: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
