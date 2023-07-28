import { Injectable } from '@nestjs/common';

import { Order } from './../../entities/orders.entity';
import {
  CreateOrderDto,
  UpdateOrderDto,
  ModifyOrderDto,
} from './../../dtos/orders.dto';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];
  private counter = 1;

  getAll() {
    return this.orders;
  }
  getOne(id: number) {
    return this.orders.find((e) => e.id === id);
  }
  getAllProducts(id: number) {
    const order = this.getOne(id);
    return order.products;
  }
  createOne(payload: CreateOrderDto) {
    const newOrder: Order = {
      id: this.counter,
      ...payload,
    };

    this.orders.push(newOrder);
    this.counter++;

    return newOrder;
  }
  updateOne(id: number, payload: UpdateOrderDto) {
    const index = this.orders.findIndex((e) => e.id === id);
    const order = this.getOne(id);

    const orderUpdate: Order = {
      id: order.id,
      ...payload,
    };

    this.orders[index] = orderUpdate;
    return orderUpdate;
  }
  modifyOne(id: number, payload: ModifyOrderDto) {
    const index = this.orders.findIndex((e) => e.id === id);
    const order = this.getOne(id);

    const orderModify: Order = {
      ...order,
      ...payload,
    };

    this.orders[index] = orderModify;
    return orderModify;
  }
  removeOne(id: number) {
    const index = this.orders.findIndex((e) => e.id === id);
    return this.orders.splice(index, 1);
  }
}
