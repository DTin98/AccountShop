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
import { ProductService as ProductService } from "./product.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import { ProductFilterDto } from "./dtos/filter-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { Product } from "./schemas/product.schema";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query() filter: ProductFilterDto): Promise<PaginateResult<Product>> {
    return this.productService.findAll(filter);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }
}
