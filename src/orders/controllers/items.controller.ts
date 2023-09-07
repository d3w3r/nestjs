import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateItemDto } from './../dtos/items.dto';
import { ItemsService } from './../services/items.service';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  listAll() {
    return this.itemsService.listAllItems();
  }
  @Post()
  createOne(@Body() payload: CreateItemDto) {
    return this.itemsService.addItemToOrder(payload);
  }
  @Delete(':id')
  removeOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.removeOne(id);
  }
  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: { productId: number; orderId: number; quantity: number },
  ) {
    return this.itemsService.updateOne(id, payload);
  }
  @Patch(':id')
  modifyOne(@Param('id', ParseIntPipe) id: number, @Body() payload: object) {
    return this.itemsService.modifyOne(id, payload);
  }
}
