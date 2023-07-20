import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  getCategories(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    const message: string = `Get all categories | limit ${limit} - offset ${offset}`;

    return { message };
  }
  @Get(':id')
  getCategory(@Param('id') id: number) {
    const message: string = `category ${id}`;

    return { message };
  }
  @Get(':cid/products')
  getCategoriesAndProduct(
    @Param('cid') cid: number,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    const message: string = `products of category ${cid} | limit ${limit} - offset ${offset}`;

    return { message };
  }
}
