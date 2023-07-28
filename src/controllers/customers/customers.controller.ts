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
} from '@nestjs/common';
import { Request, Response } from 'express';

import { CustomersService } from './../../services/customers/customers.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  ModifyCustomerDto,
} from './../../dtos/customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getAll(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return this.customersService.getAll();
  }
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.customersService.getOne(Number(id));
  }
  @Get(':id/orders')
  getOrders(
    @Param('id') id: number,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Res() res: Response,
  ) {
    const message = `Customer ${id} with orders | limit ${limit}, offset ${offset}`;

    // return { message };
    return res.status(200).json({ message });
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateCustomerDto, @Req() req: Request) {
    return this.customersService.createOne(payload);
  }
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  change(@Param('id') id: number, @Body() payload: UpdateCustomerDto) {
    return this.customersService.updateOne(Number(id), payload);
  }
  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  modify(@Param('id') id: number, @Body() payload: ModifyCustomerDto) {
    return this.customersService.modifyOne(Number(id), payload);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: number) {
    return this.customersService.removeOne(Number(id));
  }
}
