import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { Product } from "src/product/schemas/product.schema";
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

  @Prop({ require: true, default: 0 })
  totalAmount: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }] })
  products: Product[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  owner: User | string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
