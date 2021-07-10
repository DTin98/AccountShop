import { Controller, Get, Post, Body, Delete, Param } from "@nestjs/common";
import { Public } from "src/shared/decorators/public.decorator";
import { Roles } from "src/shared/decorators/role.decorator";
import { Role } from "src/users/enums/role.enum";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { Category } from "./schemas/category.schema";

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

  @Delete(":id")
  @Roles(Role.Admin)
  delete(@Param("id") id: string): Promise<Category> {
    return this.categoryService.delete(id);
  }
}
