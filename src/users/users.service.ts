import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";
import { getFilterQueries } from "src/utils/getFilterQueries";
import * as _ from "lodash";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FilterUserDto } from "./dto/user-filter.dto";
import { User, UserDocument } from "./schemas/user.schema";
import { AddUserMoneyDto } from "./dto/add-user-money.dto";
import { CutUserMoneyDto } from "./dto/cut-user-money.dto";
import { getRandomString } from "src/utils/getRandomString";
import { saltOrRoundsConstants } from "src/auth/constants";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mailerService: MailerService
  ) {}

  async getMe(userId: string): Promise<User> {
    const user = await this.userModel
      .findOne({ _id: userId })
      .select("-apiKey -verificationCode -password")
      .exec();
    if (!user) throw new BadRequestException("user is not found");
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existedUsers = await this.userModel
      .find({
        username: createUserDto.username,
      })
      .lean()
      .exec();
    if (existedUsers.length > 0)
      throw new BadRequestException("username is existed");

    const existedEmail = await this.userModel
      .findOne({
        username: createUserDto.username,
      })
      .lean()
      .exec();
    if (existedEmail) throw new BadRequestException("email is existed");

    const skipApiKeys = existedUsers.map((u) => u.apiKey);
    const apiKey = getRandomString(25, skipApiKeys);
    const createdUser = new this.userModel({
      ...createUserDto,
      transferContent: createUserDto.username,
      apiKey: apiKey,
    });
    return createdUser.save();
  }

  async findAll(filter: FilterUserDto): Promise<PaginateResult<User>> {
    const { pageSize, page, skip } = getFilterQueries(filter);

    const userCount = await this.userModel.countDocuments().exec();

    const userLst = await this.userModel
      .find(_.omit(filter, ["page_size", "page"]))
      .limit(pageSize)
      .skip(skip)
      .exec();

    return {
      data: userLst,
      totalPage: Math.ceil(userCount / pageSize),
      page,
    };
  }

  async addMoney(
    userId: string,
    addUserMoneyDto: AddUserMoneyDto
  ): Promise<User> {
    const existedUser = await this.userModel
      .findOne({
        _id: userId,
      })
      .lean()
      .exec();
    if (!existedUser) throw new BadRequestException("user is not found");

    const updatedUser = await this.userModel.updateOne(
      { _id: userId },
      { $inc: { balance: addUserMoneyDto.addMoney } },
      { new: true }
    );
    return this.userModel.findOne({ _id: userId });
  }

  async cutMoney(
    userId: string,
    cutUserMoneyDto: CutUserMoneyDto
  ): Promise<User> {
    const existedUser = await this.userModel
      .findOne({
        _id: userId,
      })
      .lean()
      .exec();
    if (!existedUser) throw new BadRequestException("user is not found");

    const updatedUser = await this.userModel.updateOne(
      { _id: userId },
      { $inc: { balance: -cutUserMoneyDto.cutMoney } },
      { new: true }
    );
    return this.userModel.findOne({ _id: userId });
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new BadRequestException("user is not found");
    return user;
  }

  patch(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { ...updateUserDto } },
      { new: true }
    );
    return updatedUser.exec();
  }

  async getApiKey(userId: string) {
    const user = await this.userModel.findById({ _id: userId }).lean().exec();
    return {
      apiKey: user.apiKey,
    };
  }

  async resetPassword(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) throw new BadRequestException("user is not found");
    if (!user.email) throw new BadRequestException("user have not email");
    const newPassword = getRandomString(6);
    const hash = await bcrypt.hash(newPassword, saltOrRoundsConstants);
    const updatedUser = await this.userModel.updateOne(
      { _id: userId },
      {
        $set: {
          password: hash,
        },
      }
    );
    this.mailerService
      .sendMail({
        to: `${user.email}`,
        from: "kaisin1505@gmail.com", // Senders email address
        subject: "NTShop reset password", // Subject line
        html: `<b>This is your new password: ${newPassword}</b>`, // HTML body content
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
    return this.userModel.findOne({ userId });
  }
}
