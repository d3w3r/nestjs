import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Post,
  Put,
  Patch,
  Delete,
  Req,
  Res,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { CustomersService } from './../services/customers.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  ModifyCustomerDto,
} from './../dtos/customers.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
    @Query('offset', new ParseIntPipe({ optional: true })) offset = 0,
  ) {
    return this.customersService.getAll(offset, limit);
  }
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.getOne(id);
  }
  // @Get(':id/orders')
  // getOrders(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Query('limit', ParseIntPipe) limit = 10,
  //   @Query('offset', ParseIntPipe) offset = 0,
  //   @Res() res: Response,
  // ) {
  //   const message = `Customer ${id} with orders | limit ${limit}, offset ${offset}`;

  //   // return { message };
  //   return res.status(200).json({ message });
  // }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateCustomerDto, @Req() req: Request) {
    return this.customersService.createOne(payload);
  }
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  change(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.updateOne(id, payload);
  }
  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  modify(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: ModifyCustomerDto,
  ) {
    return this.customersService.modifyOne(id, payload);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.removeOne(id);
  }
}
