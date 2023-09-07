import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, FindOneOptions } from 'typeorm';

import { Order } from './../entities/orders.entity';
import { User } from './../../users/entities/users.entity';
import { Product } from './../../products/entities/products.entity';
import { Item } from '../entities/items.entity';
import { ProductsService } from './../../products/services/products.service';
import { UsersService } from './../../users/services/users.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  ModifyOrderDto,
  ReviewOrderDto,
} from './../dtos/orders.dto';
import { CreateItemDto } from './../dtos/items.dto';

@Injectable()
export class OrdersService {
  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
    @InjectRepository(Item)
    private itemsRepo: Repository<Item>,
  ) {}

  async getAll(offset = 0, limit = 10, verbose = false) {
    const configuration: FindManyOptions = {
      skip: offset,
      take: limit,
    };

    if (verbose) {
      configuration.relations = ['user', 'item', 'item.product'];
    }

    const orders = await this.ordersRepo.find(configuration);

    if (orders.length === 0) throw new NotFoundException('Orders not found');

    return orders;
  }
  async getOne(id: number, verbose = false) {
    const configuration: FindOneOptions = {
      where: { id },
    };

    if (verbose) {
      configuration.relations = ['user', 'item', 'item.product'];
    }

    const order = await this.ordersRepo.findOne(configuration);

    if (!order) throw new NotFoundException(`Order ${id} not found`);

    return order;
  }
  async createOne(payload: CreateOrderDto) {
    const { userId } = payload;

    const userF = await this.usersService.getOne(userId);
    if (!userF)
      throw new NotFoundException(`The user for that order wasn't found`);

    const productsF = await this.productsService.findAllById([1]);
    if (productsF.length === 0)
      throw new NotFoundException(`None of the products specified was found`);

    payload.user = userF as User;

    const orderToCreate = await this.ordersRepo.create(payload);
    const orderCreated = await this.ordersRepo.save(orderToCreate);

    // const itemPayload: CreateItemDto = {
    //   quantity: 500,
    //   order: orderCreated,
    // };

    // const itemToCreate = await this.itemsRepo.create(itemPayload);
    // await this.itemsRepo.save(itemToCreate);

    return orderCreated;
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
