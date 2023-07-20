import { Controller, Get, Query, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('brand') brand: string,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    const message: string = `products | limit = ${limit} offset = ${offset} brand = ${brand}`;

    return message;
  }

  @Get(':id')
  getProduct(@Param('id') id: number) {
    const message: string = `product ${id}`;

    return message;
  }
}
