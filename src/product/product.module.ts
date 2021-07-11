import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Product,
  ProductSchema as ProductSchema,
} from "./schemas/product.schema";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { Country, CountrySchema } from "src/country/schemas/country.schema";
import { Payment, PaymentSchema } from "src/payment/schemas/payment.schema";
import { CountryService } from "src/country/country.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, CountryService],
})
export class ProductModule {}
