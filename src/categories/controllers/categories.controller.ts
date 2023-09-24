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
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';
import { Category } from './../entities/categories.entity';
import { CategoriesService } from './../services/categories.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  ModifyCategoryDto,
  FilterCategoryDto,
} from './../dtos/categories.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(@Query() params: FilterCategoryDto) {
    return this.categoriesService.getAll(params);
  }
  @Get(':id')
  getCategory(@Param('id', MongoIdPipe) id: Category['id']) {
    return this.categoriesService.getOne(id);
  }
  @Get(':cid/products')
  getCategoriesAndProduct(
    @Param('cid', ParseIntPipe) cid: number,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('offset', ParseIntPipe) offset = 0,
  ) {
    const message = `products of category ${cid} | limit ${limit} - offset ${offset}`;

    return { message };
  }
  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.createOne(payload);
  }
  @Put(':id')
  change(
    @Param('id', MongoIdPipe) id: Category['id'],
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateOne(id, payload);
  }
  @Patch(':id')
  modify(
    @Param('id', MongoIdPipe) id: Category['id'],
    @Body() payload: ModifyCategoryDto,
  ) {
    return this.categoriesService.modifyOne(id, payload);
  }
  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: Category['id']) {
    return this.categoriesService.removeOne(id);
  }
}
