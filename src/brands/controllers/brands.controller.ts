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

import { Brand } from './../entities/brands.entity';
import { BrandsService } from '../services/brands.service';
import {
  CreateBrandDto,
  UpdateBrandDto,
  ModifyBrandDto,
} from './../dtos/brands.dto';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getAll(
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('offset', ParseIntPipe) offset = 0,
  ) {
    return this.brandsService.getAll(limit, offset);
  }

  @Get(':id')
  getOne(@Param('id') id: Brand['id']) {
    return this.brandsService.getOne(id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.createOne(payload);
  }

  @Put(':id')
  change(@Param('id') id: Brand['id'], @Body() payload: UpdateBrandDto) {
    return this.brandsService.updateOne(id, payload);
  }

  @Patch(':id')
  modify(@Param('id') id: Brand['id'], @Body() payload: ModifyBrandDto) {
    return this.brandsService.modifyOne(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: Brand['id']) {
    return this.brandsService.removeOne(id);
  }
}
