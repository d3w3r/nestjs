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
} from '@nestjs/common';

import { BrandsService } from './../../services/brands/brands.service';
import {
  CreateBrandDto,
  UpdateBrandDto,
  ModifyBrandDto,
} from './../../dtos/brands.dto';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getAll(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return this.brandsService.getAll(limit, offset);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.brandsService.getOne(Number(id));
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.createOne(payload);
  }

  @Put(':id')
  change(@Param('id') id: number, @Body() payload: UpdateBrandDto) {
    return this.brandsService.updateOne(Number(id), payload);
  }

  @Patch(':id')
  modify(@Param('id') id: number, @Body() payload: ModifyBrandDto) {
    return this.brandsService.modifyOne(Number(id), payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.brandsService.removeOne(id);
  }
}
