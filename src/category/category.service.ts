import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isEmpty } from "class-validator";
import { Model } from "mongoose";
import {
  PAGINATE_DEFAULT,
  SORT_TYPE,
} from "src/shared/constants/pagination.constant";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { categoryFilterDto } from "./dto/filter-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category, CategoryDocument } from "./schema/category.schema";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) {}

  //NOT YET INSERT OPTION FOR QUERIES
  async findAll(filter: categoryFilterDto): Promise<PaginateResult<Category>> {
    const limit = parseInt(filter.limit) || PAGINATE_DEFAULT.LIMIT_LAUNCH;
    const page = parseInt(filter.page) || 1;
    const skip = page * limit - limit;

    let categoryLst;
    if (limit > 10)
      categoryLst = await this.categoryModel
        .find({})
        .limit(limit)
        .skip(limit * page)
        .sort({
          countryCode: "asc",
        })
        .exec();
    else
      categoryLst = await this.categoryModel
        .find({})
        .limit(limit)
        .sort({
          countryCode: "asc",
        })
        .exec();

    return {
      data: categoryLst,
      total: categoryLst.length,
      page,
    };
  }
}
