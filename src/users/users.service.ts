import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isExistedUser = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (isExistedUser) throw new BadRequestException('username is existed');

    const createdUser = new this.userModel(createUserDto);
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
      { new: true },
    );
    return updatedUser.exec();
  }

  remove(id: string): Promise<User> {
    const removedUser = this.userModel.findOneAndRemove({ _id: id });
    return removedUser.exec();
  }
}
