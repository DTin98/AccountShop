import { Module } from "@nestjs/common";
import { CountryService } from "./country.service";
import { CountryController } from "./country.controller";
import { Country, CountrySchema } from "./schemas/country.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "src/product/schemas/product.schema";
import { User, UserSchema } from "src/users/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
