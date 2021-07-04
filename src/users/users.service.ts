import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { getRandomString } from "src/utils/getRandomString";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

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

    const users = await this.userModel.find().lean().exec();
    for (let i = 0; i < users.length; i++) {
      await this.userModel.updateOne(
        { _id: users[i]._id },
        { $set: { transferContent: "NTSHOP" + getRandomString(10, []) } }
      );
    }
    const skipLst = isExistedUser.map((u) => u.transferContent || "");
    const transferContent = getRandomString(10, skipLst);
    const createdUser = new this.userModel({
      ...createUserDto,
      transferContent: "NTSHOP" + transferContent,
    });
    return createdUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(username: string): Promise<User> {
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

  async getTransferContent(userId: string): Promise<string> {
    const content = await this.userModel
      .findById({ _id: userId })
      .lean()
      .exec();
    return content.transferContent;
  }
}
