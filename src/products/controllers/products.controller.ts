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

import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';
import { FilterPipe } from './../../common/filter/filter.pipe';
import { ProductsService } from './../services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  ModifyProductDto,
  FilterProductDto,
} from './../dtos/products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(@Query(FilterPipe) filter: FilterProductDto) {
    return this.productsService.findAll(filter);
  }

  @Get(':id')
  getProduct(
    @Param('id', MongoIdPipe) id: string,
    @Query('verbose', new ParseBoolPipe({ optional: true })) verbose = false,
  ) {
    return this.productsService.findOne(id, verbose);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Patch(':id')
  modify(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: ModifyProductDto,
  ) {
    return this.productsService.modify(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
