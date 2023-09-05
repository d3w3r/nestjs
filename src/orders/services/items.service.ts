import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Items } from './../entities/items.entity';
import { Product } from './../../products/entities/products.entity';
import { CreateItemDto } from './../dtos/items.dto';
import { ProductsService } from './../../products/services/products.service';
import { OrdersService } from './../../orders/services/orders.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items) private itemsRepo: Repository<Items>,
    private productsService: ProductsService,
    private ordersService: OrdersService,
  ) {}

  async addItemToOrder(payload: CreateItemDto) {
    const { productId, orderId } = payload;

    console.log(productId, orderId);

    const product = await this.productsService.findOne(productId, false);
    const order = await this.ordersService.getOne(orderId);

    if (!product)
      throw new NotFoundException(
        `Product ${productId} not found, the item cannot be registered`,
      );
    if (!order)
      throw new NotFoundException(
        `Order ${orderId} not found, the item cannot be registered`,
      );

    payload.order = order;
    payload.product = product as Product;

    const itemC = this.itemsRepo.create(payload);
    const itemS = await this.itemsRepo.save(itemC);

    return itemS;
  }
}
