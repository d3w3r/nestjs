import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get()
  getAll(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    const message: string = `All customers | limit ${limit}, offset ${offset}`;

    return message;
  }
  @Get(':id')
  getOne(@Param('id') id: number) {
    const message: string = `Customer ${id}`;

    return message;
  }
  @Get(':id/orders')
  getOrders(
    @Param('id') id: number,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    const message: string = `Customer ${id} with orders | limit ${limit}, offset ${offset}`;

    return message;
  }
}
