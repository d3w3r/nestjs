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
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('customers')
export class CustomersController {
  @Get()
  getAll(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    const message = `All customers | limit ${limit}, offset ${offset}`;

    return { message };
  }
  @Get(':id')
  getOne(@Param('id') id: number) {
    const message = `Customer ${id}`;

    return { message };
  }
  @Get(':id/orders')
  getOrders(
    @Param('id') id: number,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ) {
    const message = `Customer ${id} with orders | limit ${limit}, offset ${offset}`;

    return { message };
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: unknown, @Req() req: Request) {
    // console.log(req.headers);
    const message = 'Action create a new Customer';
    return { message, payload };
  }
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  change(@Param('id') id: number, @Body() payload: unknown) {
    const message = `Action change the customer ${id} for a new one`;
    return { message, payload };
  }
  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  modify(@Param('id') id: number, @Body() payload: unknown) {
    const message = `Action modify the customer ${id}`;
    return { message, payload };
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: number) {
    const message = `Action remove the customer ${id}`;
    return { message };
  }
}
