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
import { Country } from "src/country/schemas/country.schema";
import { User } from "src/users/schemas/user.schema";

export type PaymentDocument = Payment & Document;

@Schema({
  timestamps: true,
})
export class Payment {
  @Prop({ require: true })
  describe: string;

  @Prop({ require: true })
  categoryName: string;

  @Prop({ require: true })
  quantity: number;

  @Prop({ require: true })
  amount: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }] })
  products: Product[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  @Exclude()
  owner: User | string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
