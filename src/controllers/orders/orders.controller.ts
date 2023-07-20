import { Controller, Get, Query, Param } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getAll(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('dateIni') dateIni: number,
    @Query('dateEnd') dateEnd: number,
  ) {
    const message: string = `All orders | limit ${limit} - offset ${offset} - dateIni ${dateIni} - dateEnd ${dateEnd}`;

    return { message };
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    const message: string = `The order ${id}`;

    return { message };
  }

  @Get(':id/products')
  getProducts(
    @Param('id') id: number,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    const message: string = `Order ${id} has products | limit ${limit}, offset ${offset}`;

    return { message };
  }
}
