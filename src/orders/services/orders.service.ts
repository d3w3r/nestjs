import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from './../entities/orders.entity';
import { Product } from './../../products/entities/products.entity';
import { ProductsService } from './../../products/services/products.service';
import { UsersService } from './../../users/services/users.service';
import {
  CreateOrderDto,
  UpdateOrderDto,
  ModifyOrderDto,
  ReviewOrderDto,
  FilterOrderDto,
} from './../dtos/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  async getAll(params: FilterOrderDto) {
    const { limit, offset } = params;

    const orders = await this.orderModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();
    if (orders.length === 0) throw new NotFoundException(`Orders not found`);

    return orders;
  }
  async getOne(id: Order['id']) {
    const order = await this.orderModel.findById(id).exec();
    if (!order) throw new NotFoundException(`Order ${id} not found`);

    return order;
  }
  getAllProducts(id: number) {
    return;
  }
  async createOne(payload: CreateOrderDto) {
    const toCreate = new this.orderModel(payload);
    const order = await toCreate.save();

    return order;
  }
  async updateOne(id: Order['id'], payload: UpdateOrderDto) {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!order) throw new NotFoundException(`Order ${id} not found`);

    return order;
  }
  async modifyOne(id: Order['id'], payload: ModifyOrderDto) {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!order) throw new NotFoundException(`Order ${id} not found`);

    return order;
  }
  async removeOne(id: Order['id']) {
    const order = await this.orderModel.findByIdAndDelete(id).exec();
    if (!order) throw new NotFoundException(`Order ${id} not found`);

    return order;
  }
}
