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
  ParseIntPipe,
} from '@nestjs/common';

import { OrdersService } from './../../services/orders/orders.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  ModifyOrderDto,
} from './../../dtos/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getAll(
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('offset', ParseIntPipe) offset = 0,
    @Query('dateIni', ParseIntPipe) dateIni: number,
    @Query('dateEnd', ParseIntPipe) dateEnd: number,
  ) {
    return this.ordersService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getOne(id);
  }

  @Get(':id/products')
  getProducts(
    @Param('id', ParseIntPipe) id: number,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('offset', ParseIntPipe) offset = 0,
  ) {
    return this.ordersService.getAllProducts(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.createOne(payload);
  }

  @Put(':id')
  change(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.ordersService.updateOne(id, payload);
  }

  @Patch(':id')
  modify(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: ModifyOrderDto,
  ) {
    return this.ordersService.modifyOne(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.removeOne(id);
  }
}
