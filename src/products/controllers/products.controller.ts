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
  // ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from './../services/products.service';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
  ModifyProductDto,
} from './../dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('brand') brand: string,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('offset', ParseIntPipe) offset = 0,
  ) {
    return this.productsService.findAll(/*limit, offset*/);
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Patch(':id')
  modify(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: ModifyProductDto,
  ) {
    return this.productsService.modify(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
