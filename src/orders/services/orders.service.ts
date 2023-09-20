import { Injectable, NotFoundException } from '@nestjs/common';

import { Order } from './../entities/orders.entity';
import { Product } from './../../products/entities/products.entity';
import { ProductsService } from './../../products/services/products.service';
import { UsersService } from './../../users/services/users.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  ModifyOrderDto,
  ReviewOrderDto,
} from './../dtos/orders.dto';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];
  private counter = 1;

  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  private _getUser(id: number) {
    let user;
    try {
      user = this.usersService.getOne(id);
    } catch (err) {}

    return user;
  }
  private _getProducts(ids: string[]) {
    const products: Product[] = [];

    for (const id of ids) {
      let product;
      try {
        product = this.productsService.findOne(id, true);
      } catch (err) {
        continue;
      }

      products.push(product);
    }

    return products;
  }
  private _getOne(id: number) {
    const order = this.orders.find((e) => e.id === id);
    if (!order) throw new NotFoundException(`Order ${id} not found`);

    return order;
  }

  getAll(): ReviewOrderDto[] {
    const list = this.orders;
    if (list.length === 0) throw new NotFoundException('Orders not found');

    const data = list.map((e) => {
      const { userID, productsID, ...copied } = e;

      const user = this._getUser(userID);
      const products = this._getProducts(productsID);

      return { ...copied, user, products };
    });

    return data;
  }
  getOne(id: number): ReviewOrderDto {
    const order = this.orders.find((e) => e.id === id);
    if (!order) throw new NotFoundException(`Order ${id} not found`);

    const { userID, productsID, ...copied } = order;
    const user = this._getUser(userID);
    const products = this._getProducts(productsID);

    const result = { ...copied, user, products };

    return result;
  }
  getAllProducts(id: number) {
    const order = this.getOne(id);
    if (order) throw new NotFoundException(`Order ${id} not found`);

    return order.products;
  }
  createOne(payload: CreateOrderDto) {
    const newOrder: Order = {
      id: this.counter,
      date: new Date(),
      ...payload,
    };

    this.orders.push(newOrder);
    this.counter++;

    return newOrder;
  }
  updateOne(id: number, payload: UpdateOrderDto) {
    const index = this.orders.findIndex((e) => e.id === id);
    const order = this._getOne(id);
    if (!order) throw new NotFoundException(`Order ${id} not found`);

    const orderUpdate: Order = {
      id: order.id,
      date: new Date(),
      ...payload,
    };

    this.orders[index] = orderUpdate;
    return orderUpdate;
  }
  modifyOne(id: number, payload: ModifyOrderDto) {
    const index = this.orders.findIndex((e) => e.id === id);
    const order = this._getOne(id);
    if (!order) throw new NotFoundException(`Order ${id} not found`);

    const orderModify: Order = {
      ...order,
      ...payload,
    };

    this.orders[index] = orderModify;
    return orderModify;
  }
  removeOne(id: number) {
    const index = this.orders.findIndex((e) => e.id === id);
    if (index === -1) throw new NotFoundException(`Order ${id} not found`);

    return this.orders.splice(index, 1);
  }
}
