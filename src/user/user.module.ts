import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UsersController } from "./user.controller";
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
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
