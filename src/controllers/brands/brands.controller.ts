import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getAll(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    const message: string = `All brands | limit ${limit}, offset ${offset}`;

    return { message };
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    const message: string = `Brand ${id}`;

    return { message };
  }
}
