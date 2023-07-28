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
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('dateIni') dateIni: number,
    @Query('dateEnd') dateEnd: number,
  ) {
    return this.ordersService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.ordersService.getOne(Number(id));
  }

  @Get(':id/products')
  getProducts(
    @Param('id') id: number,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ) {
    return this.ordersService.getAllProducts(Number(id));
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.createOne(payload);
  }

  @Put(':id')
  change(@Param('id') id: number, @Body() payload: UpdateOrderDto) {
    return this.ordersService.updateOne(Number(id), payload);
  }

  @Patch(':id')
  modify(@Param('id') id: number, @Body() payload: ModifyOrderDto) {
    return this.ordersService.modifyOne(Number(id), payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ordersService.removeOne(Number(id));
  }
}
