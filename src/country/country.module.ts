import { Module } from "@nestjs/common";
import { CountryService } from "./country.service";
import { CountryController } from "./country.controller";
import { Country, CountrySchema } from "./schemas/country.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
