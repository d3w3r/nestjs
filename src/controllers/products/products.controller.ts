import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('brand') brand: string,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    const message: string = `products | limit = ${limit} offset = ${offset} brand = ${brand}`;

    return { message };
  }

  @Get(':id')
  getProduct(@Param('id') id: number) {
    const message: string = `product ${id}`;

    return { message };
  }

  @Post()
  create(@Body() payload: unknown) {
    const message = 'action create Product';

    return { message, payload };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: unknown) {
    const message = `Action Updating Product ${id}`;
    return { message, payload };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    const message = `Product ${id} removed`;
    return { message };
  }
}
