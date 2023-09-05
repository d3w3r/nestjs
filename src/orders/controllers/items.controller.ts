import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';

import { CreateItemDto } from './../dtos/items.dto';
import { ItemsService } from './../services/items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post(':idOrder')
  addItemToOrder(
    @Param('idOrder', ParseIntPipe) idOrder: number,
    @Body() payload: CreateItemDto,
  ) {
    return this.itemsService.addItemToOrder(payload);
  }
}
