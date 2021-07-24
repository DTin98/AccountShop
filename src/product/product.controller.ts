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
  UseInterceptors,
  UploadedFile,
  UseGuards,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { PaginateResult } from "src/shared/interfaces/paginate-result.interface";
import { ProductService as ProductService } from "./product.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import { FilterProductDto } from "./dtos/filter-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { Product } from "./schemas/product.schema";
import { Public } from "src/shared/decorators/public.decorator";
import { BuyProductsDto } from "./dtos/buy-products.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateProductByUploadDto } from "./dtos/create-product-by-upload.dto";
import { apiKeyGuard } from "src/shared/guards/api-key.guard";
import { UsersService } from "src/users/users.service";

@Controller("product")
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UsersService
  ) {}

  @Public()
  @Get()
  findAll(@Query() filter: FilterProductDto): Promise<PaginateResult<Product>> {
    return this.productService.findAll(filter);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Post("customer/buy")
  @Public()
  @HttpCode(HttpStatus.OK)
  async buyProductsByApiKey(
    @Req() req,
    @Query("api_key") apiKey: string,
    @Body() buyProductsDto: BuyProductsDto
  ): Promise<Product[]> {
    const user = await this.userService.findApiKey(apiKey);
    if (!user) throw new ForbiddenException("Forbidden");
    return this.productService.buyProducts(user._id, buyProductsDto);
  }

  @Post("buy")
  @HttpCode(HttpStatus.OK)
  async buyProducts(
    @Req() req,
    @Body() buyProductsDto: BuyProductsDto
  ): Promise<Product[]> {
    const { userId } = req.user;
    return this.productService.buyProducts(userId, buyProductsDto);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(
    @Body() createProductByUploadDto: CreateProductByUploadDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.productService.createProductsByFile(
      createProductByUploadDto.country,
      file
    );
  }
}
