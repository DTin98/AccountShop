import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MailerModule.forRoot({
      transport: {
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "kaisin1505@gmail.com", // generated ethereal user
          pass: "aaaa1111AA",
        },
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
