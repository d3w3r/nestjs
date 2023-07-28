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

import { CategoriesService } from './../../services/categories/categories.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  ModifyCategoryDto,
} from './../../dtos/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return this.categoriesService.getAll(limit, offset);
  }
  @Get(':id')
  getCategory(@Param('id') id: number) {
    return this.categoriesService.getOne(Number(id));
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
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.createOne(payload);
  }
  @Put(':id')
  change(@Param('id') id: number, @Body() payload: UpdateCategoryDto) {
    return this.categoriesService.updateOne(Number(id), payload);
  }
  @Patch(':id')
  modify(@Param('id') id: number, @Body() payload: ModifyCategoryDto) {
    return this.categoriesService.modifyOne(Number(id), payload);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriesService.removeOne(Number(id));
  }
}
