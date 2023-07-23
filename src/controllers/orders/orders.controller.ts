import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('dateIni') dateIni: number,
    @Query('dateEnd') dateEnd: number,
  ) {
    const message = `All orders | limit ${limit} - offset ${offset} - dateIni ${dateIni} - dateEnd ${dateEnd}`;

    return { message };
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    const message = `The order ${id}`;

    return { message };
  }

  @Get(':id/products')
  getProducts(
    @Param('id') id: number,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ) {
    const message = `Order ${id} has products | limit ${limit}, offset ${offset}`;

    return { message };
  }

  @Post()
  create(@Body() payload: unknown) {
    const message = 'Method to upload a orders';
    return { message, payload };
  }

  @Put(':id')
  change(@Param('id') id: number, @Body() payload: unknown) {
    const message = `Method to change the order ${id} for other new.`;
    return { message, payload };
  }

  @Patch(':id')
  modify(@Param('id') id: number, @Body() payload: unknown) {
    const message = `Method to modify the order ${id}`;
    return { message, payload };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    const message = `Removed the order ${id}`;
    return { message };
  }
}
