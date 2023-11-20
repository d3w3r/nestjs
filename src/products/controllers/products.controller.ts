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
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ProductsService } from './../services/products.service';
// import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
  ModifyProductDto,
} from './../dtos/products.dto';

@UseGuards(AuthGuard('jwt'))
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
    @Query('max', new ParseIntPipe({ optional: true })) max: number,
    @Query('min', new ParseIntPipe({ optional: true })) min: number,
  ) {
    return this.productsService.findAll(verbose, limit, offset, max, min);
  }

  @Get(':id')
  getProduct(
    @Param('id', ParseIntPipe) id: number,
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
