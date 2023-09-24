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
import { ApiTags } from '@nestjs/swagger';

import { Order } from './../entities/orders.entity';
import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';
import { OrdersService } from '../services/orders.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  ModifyOrderDto,
  FilterOrderDto,
} from './../dtos/orders.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getAll(@Query() params: FilterOrderDto) {
    return this.ordersService.getAll(params);
  }

  @Get(':id')
  getOne(@Param('id', MongoIdPipe) id: Order['id']) {
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
    @Param('id', MongoIdPipe) id: Order['id'],
    @Body() payload: UpdateOrderDto,
  ) {
    return this.ordersService.updateOne(id, payload);
  }

  @Patch(':id')
  modify(
    @Param('id', MongoIdPipe) id: Order['id'],
    @Body() payload: ModifyOrderDto,
  ) {
    return this.ordersService.modifyOne(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: Order['id']) {
    return this.ordersService.removeOne(id);
  }
}
