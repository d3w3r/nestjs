import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './../entities/orders.entity';
import { User } from './../../users/entities/users.entity';
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
  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
  ) {}

  private async _getUser(id: number) {
    let user;
    try {
      user = await this.usersService.getOne(id, true);
    } catch (err) {}

    return user;
  }
  private async _getProducts(ids: number[]) {
    const productsPromises = [];

    for (const id of ids) {
      productsPromises.push(this.productsService.findOne(id, true));
    }

    const resolved = await Promise.allSettled(productsPromises);
    const products = resolved
      .map((e) => {
        if ('value' in e) return e.value;
      })
      .filter((e) => e);

    return products;
  }
  private async _getOneVerbose(order: Order) {
    const { userId, productsID, ...rest } = order;

    const user = await this._getUser(userId);
    const products = await this._getProducts(productsID);

    const orderVerbose = { ...rest, user, products };

    return orderVerbose;
  }
  private async _getManyVerbose(orders: Order[]) {
    const toResolve = [];
    orders.forEach(async (e) => {
      toResolve.push(this._getOneVerbose(e));
    });

    const resolved = await Promise.allSettled(toResolve);
    const ordersVerbose = resolved.map((e) => {
      if ('value' in e) return e.value;
    });

    return ordersVerbose;
  }
  private async _evalExistUserAndProducts(order: Order) {
    const { userId, productsID } = order;

    const user = await this._getUser(userId);

    if (!user) throw new NotFoundException(`User not found for the order`);

    const products = await this._getProducts(productsID);

    if (products.length === 0)
      throw new NotFoundException(`Products not found for the order`);

    const avaliableProducts = products.map((e) => e.id);

    return { avaliableProducts };
  }

  async getAll(offset: number, limit: number, verbose = false) {
    const orders = await this.ordersRepo.find({ skip: offset, take: limit });

    if (orders.length === 0) throw new NotFoundException('Orders not found');

    if (!verbose) return orders;
    else return this._getManyVerbose(orders);
  }
  async getOne(id: number, verbose = false) {
    // const order = await this.ordersRepo.findOne({ where: { id } });

    // if (!order) throw new NotFoundException(`Order ${id} not found`);

    if (!verbose) {
      const order = await this.ordersRepo.findOne({ where: { id } });
      return order;
    } else {
      const order = await this.ordersRepo.findOne({
        where: { id },
        relations: ['user'],
      });
      return order;
    }
  }
  async createOne(payload) {
    const { userID, productsID } = payload;

    const user = await this._getUser(userID);
    if (!user)
      throw new NotFoundException(`The user for that order wasn't found`);

    const products = await this._getProducts(productsID);
    if (products.length === 0)
      throw new NotFoundException(`None of the products specified was found`);

    const productsFound = products.map((e) => {
      if ('id' in e) return e.id;
    });

    payload.user = user;

    const newPayload = {
      ...payload,
      productsID: productsFound,
    };

    const orderToCreate = this.ordersRepo.create(newPayload);

    return this.ordersRepo.save(orderToCreate);
  }
  async updateOne(id: number, payload: UpdateOrderDto) {
    const order = await this.getOne(id);

    if (!order) throw new NotFoundException(`The order ${id} wasn't found`);

    const merged = this.ordersRepo.merge(order as Order, payload);
    await this.ordersRepo.update(id, merged);

    return merged;
  }
  async modifyOne(id: number, payload: ModifyOrderDto) {
    const order = await this.getOne(id);

    if (!order) throw new NotFoundException(`The order ${id} wasn't found`);

    const merged = this.ordersRepo.merge(order as Order, payload);
    await this.ordersRepo.update(id, merged);

    return merged;
  }
  async removeOne(id: number) {
    const order = await this.getOne(id);

    if (!order) throw new NotFoundException(`Order ${id} not found`);

    await this.ordersRepo.delete(id);

    return order;
  }
  getAllProducts(id: number) {
    // const order = this.getOne(id);
    // if (order) throw new NotFoundException(`Order ${id} not found`);

    // return order.products;
    return {};
  }
}
