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
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductsService } from './../services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  ModifyProductDto,
} from './../dtos/products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('brand') brand: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
    @Query('offset', new ParseIntPipe({ optional: true })) offset = 0,
    @Query('verbose', new ParseBoolPipe({ optional: true })) verbose = false,
  ) {
    return this.productsService.findAll(verbose /*limit, offset*/);
  }

  @Get(':id')
  getProduct(
    @Param('id') id: string,
    @Query('verbose', new ParseBoolPipe({ optional: true })) verbose = false,
  ) {
    return this.productsService.findOne(id, verbose);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);
  }

  @Patch(':id')
  modify(@Param('id') id: string, @Body() payload: ModifyProductDto) {
    return this.productsService.modify(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
