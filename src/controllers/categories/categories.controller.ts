import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Patch,
  Put,
  Delete,
  Body,
} from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  getCategories(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    const message = `Get all categories | limit ${limit} - offset ${offset}`;

    return { message };
  }
  @Get(':id')
  getCategory(@Param('id') id: number) {
    const message = `category ${id}`;

    return { message };
  }
  @Get(':cid/products')
  getCategoriesAndProduct(
    @Param('cid') cid: number,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ) {
    const message = `products of category ${cid} | limit ${limit} - offset ${offset}`;

    return { message };
  }
  @Post()
  create(@Body() payload: unknown) {
    const message = `Action of create a new category.`;
    return { message, payload };
  }
  @Put(':id')
  change(@Param('id') id: number, @Body() payload: unknown) {
    const message = `Action of replace the category ${id} by a new one`;
    return { message, payload };
  }
  @Patch(':id')
  modify(@Param('id') id: number, @Body() payload: unknown) {
    const message = `Action of modify the category ${id}`;
    return { message, payload };
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    const message = `Action of remove the category ${id}`;
    return { message };
  }
}
