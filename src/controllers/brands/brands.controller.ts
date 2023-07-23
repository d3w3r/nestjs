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

@Controller('brands')
export class BrandsController {
  @Get()
  getAll(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    const message = `All brands | limit ${limit}, offset ${offset}`;

    return { message };
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    const message = `Brand ${id}`;

    return { message };
  }

  @Post()
  create(@Body() payload: unknown) {
    const message = 'Action create a new Brand';
    return { message, payload };
  }

  @Put(':id')
  change(@Param('id') id: number, @Body() payload: unknown) {
    const message = `Action change the Brand ${id} for another`;
    return { message, payload };
  }

  @Patch(':id')
  modify(@Param('id') id: number, @Body() payload: unknown) {
    const message = `Action modify the Branch ${id}`;
    return { message, payload };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    const message = `Action remove the Brand ${id}`;
    return { message };
  }
}
