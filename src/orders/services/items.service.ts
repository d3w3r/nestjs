import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Item } from './../entities/items.entity';
import { Order } from './../entities/orders.entity';
import { CreateItemDto } from './../dtos/items.dto';
import { Product } from './../../products/entities/products.entity';
import { OrdersService } from './../../orders/services/orders.service';
import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemsRepo: Repository<Item>,
    private productsService: ProductsService,
    private ordersService: OrdersService,
  ) {}

  async listOne(id: number) {
    const item = await this.itemsRepo.findOneBy({ id });

    if (!item) throw new NotFoundException(`Item ${id} not found`);

    return item;
  }
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
  async listAllItems() {
    const items = await this.itemsRepo.find();

    if (items.length === 0) throw new NotFoundException('Items not found');

    return items;
  }
  async removeOne(id: number) {
    const item = await this.itemsRepo.findOne({ where: { id } });

    if (!item) throw new NotFoundException(`Item ${id} not found`);

    await this.itemsRepo.delete(id);

    return item;
  }
  async updateOne(
    id: number,
    payload: { productId: number; orderId: number; quantity: number },
  ) {
    const { productId, orderId, ...rest } = payload;

    const item = await this.listOne(id);
    const order = await this.ordersService.getOne(orderId);
    const product = await this.productsService.findOne(productId, false);

    if (!item) throw new NotFoundException(`Item ${id} not found`);
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    if (!product) throw new NotFoundException(`Product ${id} not found`);

    const newItem = {
      ...rest,
      order,
      product,
    };

    const itemM = this.itemsRepo.merge(item, newItem);

    await this.itemsRepo.update({ id }, itemM);

    return itemM;
  }
  async modifyOne(
    id: number,
    payload: { productId?: number; orderId?: number; quantity?: number },
  ) {
    const { productId, orderId, quantity } = payload;

    const item = await this.listOne(id);
    if (!item) throw new NotFoundException(`Item ${id} not found`);

    const newItem: { quantity?: number; order?: Order; product?: Product } = {};

    if (productId!) {
      const product = await this.productsService.findOne(productId, false);
      if (!product)
        throw new NotFoundException(`Product ${productId} not found`);
      newItem.product = product;
    }
    if (orderId!) {
      const order = await this.ordersService.getOne(orderId);
      if (!order) throw new NotFoundException(`Order ${orderId} not found`);
      newItem.order = order;
    }
    if (quantity!) {
      newItem.quantity = quantity;
    }

    const itemM = this.itemsRepo.merge(item, newItem);
    await this.itemsRepo.update({ id }, itemM);

    return itemM;
  }
}
