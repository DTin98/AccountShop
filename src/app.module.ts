import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./shared/guards/jwt-auth.guard";
import { RolesGuard } from "./shared/guards/roles.guard";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://admin:Mothaiba45sau@codebasecluster0.nsoaj.mongodb.net/AccountShop",
      { useFindAndModify: false }
    ),
    UsersModule,
    AuthModule,
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
