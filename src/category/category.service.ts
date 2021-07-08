import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { Category, CategoryDocument } from "./schemas/category.schema";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const isExistedCategory = await this.categoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (isExistedCategory)
      throw new BadRequestException("category name is existed");

    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
}
