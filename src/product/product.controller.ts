import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";
import { ProductService as ProductService } from "./product.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import { FilterProductDto } from "./dtos/filter-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { Product } from "./schemas/product.schema";
import { Public } from "src/shared/decorators/public.decorator";
import { BuyProductsDto } from "./dtos/buy-products.dto";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get()
  findAll(@Query() filter: FilterProductDto): Promise<PaginateResult<Product>> {
    return this.productService.findAll(filter);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Post("buy")
  @HttpCode(HttpStatus.OK)
  buyProducts(
    @Req() req,
    @Body() buyProductsDto: BuyProductsDto
  ): Promise<Product[]> {
    const { userId } = req.user;
    return this.productService.buyProducts(userId, buyProductsDto);
  }
}
