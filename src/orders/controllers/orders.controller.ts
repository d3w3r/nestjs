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
  ParseBoolPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrdersService } from '../services/orders.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  ModifyOrderDto,
} from './../dtos/orders.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset: number,
    @Query('verbose', new ParseBoolPipe({ optional: true })) verbose: boolean,
  ) {
    return this.ordersService.getAll(offset, limit, verbose);
  }

  @Get(':id')
  getOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('verbose', new ParseBoolPipe({ optional: true })) verbose: boolean,
  ) {
    return this.ordersService.getOne(id, verbose);
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
