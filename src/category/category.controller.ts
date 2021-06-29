import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { categoryFilterDto } from "./dto/filter-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./schema/category.schema";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(
    @Query() filter: categoryFilterDto
  ): Promise<PaginateResult<Category>> {
    return this.categoryService.findAll(filter);
  }
}
