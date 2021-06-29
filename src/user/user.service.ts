import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { randomVerificationCode as randomCode } from "src/utils/randomVerificationCode";
import { emailCodeLengthConstant as RANDOM_CODE_LENGTH } from "./constants";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mailerService: MailerService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isExistedUser = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (isExistedUser) throw new BadRequestException("username is existed");

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  findOneWithUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { ...updateUserDto } },
      { new: true }
    );
    return updatedUser.exec();
  }

  remove(id: string): Promise<User> {
    const removedUser = this.userModel.findOneAndRemove({ _id: id });
    return removedUser.exec();
  }

  async sendCodeToEmail(id: string): Promise<any> {
    const user = await this.findOne(id);
    if (!user) throw new BadRequestException("user is not found");
    if (user.isVerified) throw new BadRequestException("user is activated");
    if (!user.email) throw new BadRequestException("user have not email");

    const verificationCode = randomCode(RANDOM_CODE_LENGTH);
    const updatedUser = this.userModel
      .updateOne({ id }, { verificationCode })
      .then(() =>
        console.info(`updated user ${id} with code ${verificationCode}`)
      );

    return this.mailerService
      .sendMail({
        to: `${user.email}`,
        from: "NTGroup Shop", // Senders email address
        subject: "Verify Your Account", // Subject line
        html: `<b>This is your code: ${verificationCode}</b>`, // HTML body content
      })
      .then((success) => {
        console.info(`email is sent to ${user.email}`);
      });
  }

  async verifyEmail(id: string): Promise<any> {}
}
