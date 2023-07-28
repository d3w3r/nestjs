import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';

import { ProductsService } from './../../services/products/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  ModifyProductDto,
} from './../../dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('brand') brand: string,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ) {
    return this.productsService.findAll();
  }

  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.productsService.findOne(Number(id));
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productsService.update(Number(id), payload);
  }

  @Patch(':id')
  modify(@Param('id') id: number, @Body() payload: ModifyProductDto) {
    return this.productsService.modify(Number(id), payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(Number(id));
  }
}
