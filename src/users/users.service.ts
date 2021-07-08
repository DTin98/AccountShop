import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";
import { getFilterQueries } from "src/utils/getFilterQueries";
import * as _ from "lodash";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FilterUserDto } from "./dto/user-filter.dto";
import { User, UserDocument } from "./schemas/user.schema";
import { AddUserMoneyDto } from "./dto/add-user-money.dto";
import { CutUserMoneyDto } from "./dto/cut-user-money.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isExistedUser = await this.userModel
      .find({
        username: createUserDto.username,
      })
      .lean()
      .exec();
    if (isExistedUser.length > 0)
      throw new BadRequestException("username is existed");

    const createdUser = new this.userModel({
      ...createUserDto,
      transferContent: createUserDto.username,
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

  findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  patch(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { ...updateUserDto } },
      { new: true }
    );
    return updatedUser.exec();
  }

  async getTransferContent(userId: string): Promise<string> {
    const content = await this.userModel
      .findById({ _id: userId })
      .lean()
      .exec();
    return content.transferContent;
  }
}
