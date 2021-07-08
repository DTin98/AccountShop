import { Controller, Get, Post, Body } from "@nestjs/common";
import { Public } from "src/shared/decorators/public.decorator";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dtos/create-category.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}
