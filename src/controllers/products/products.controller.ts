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
  create(@Body() payload: unknown) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: unknown) {
    return this.productsService.update(Number(id), payload);
  }

  @Patch(':id')
  modify(@Param('id') id: number, @Body() payload: unknown) {
    return this.productsService.modify(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(Number(id));
  }
}
