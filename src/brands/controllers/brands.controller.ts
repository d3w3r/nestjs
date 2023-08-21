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
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
    @Query('offset', new ParseIntPipe({ optional: true })) offset = 0,
  ) {
    return this.brandsService.getAll(limit, offset);
  }

  @Get(':id')
  getOne(@Param('id', new ParseIntPipe({ optional: true })) id: number) {
    return this.brandsService.getOne(id);
  }

  // @Post()
  // create(@Body() payload: CreateBrandDto) {
  //   return this.brandsService.createOne(payload);
  // }

  // @Put(':id')
  // change(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() payload: UpdateBrandDto,
  // ) {
  //   return this.brandsService.updateOne(id, payload);
  // }

  // @Patch(':id')
  // modify(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() payload: ModifyBrandDto,
  // ) {
  //   return this.brandsService.modifyOne(id, payload);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.brandsService.removeOne(id);
  // }
}
