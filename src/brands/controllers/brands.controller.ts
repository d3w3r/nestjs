import {
  Controller,
  Get,
  Param,
  Query,
  Put,
  Patch,
  Delete,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';
import { Brand } from './../entities/brands.entity';
import { BrandsService } from '../services/brands.service';
import {
  CreateBrandDto,
  UpdateBrandDto,
  ModifyBrandDto,
  FilterBrandDto,
} from './../dtos/brands.dto';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getAll(@Query() params: FilterBrandDto) {
    return this.brandsService.getAll(params);
  }

  @Get(':id')
  getOne(@Param('id', MongoIdPipe) id: Brand['id']) {
    return this.brandsService.getOne(id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.createOne(payload);
  }

  @Put(':id')
  change(
    @Param('id', MongoIdPipe) id: Brand['id'],
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.updateOne(id, payload);
  }

  @Patch(':id')
  modify(
    @Param('id', MongoIdPipe) id: Brand['id'],
    @Body() payload: ModifyBrandDto,
  ) {
    return this.brandsService.modifyOne(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: Brand['id']) {
    return this.brandsService.removeOne(id);
  }
}
