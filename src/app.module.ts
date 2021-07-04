import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./shared/guards/jwt-auth.guard";
import { RolesGuard } from "./shared/guards/roles.guard";
import { ProductModule } from "./product/product.module";
import { CategoryModule } from "./category/category.module";
import { CountryModule } from "./country/country.module";
import { PaymentModule } from "./payment/payment.module";
import { UsersService } from "./users/users.service";
import { UserSchema } from "./users/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://admin:Mothaiba45sau@codebasecluster0.nsoaj.mongodb.net/AccountShop",
      { useFindAndModify: false }
    ),
    UsersModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    CountryModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
