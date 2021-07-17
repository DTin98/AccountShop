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
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb://admin:%5D5hLxZ47S%2a%7B%21F8%21oDatabase@207.148.71.119:27017/shopDB?authSource=admin",
      { useFindAndModify: false }
    ),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
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
