import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from './../../orders/entities/orders.entity';
import { User } from './../entities/users.entity';
import { Customer } from './../../customers/entities/customers.entity';
import { CustomersService } from './../../customers/services/customers.service';
import {
  CreateUserDto,
  UpdateUserDto,
  PatchUserDto,
  ReviewUserDto,
} from './../dtos/users.dto';
import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private customersService: CustomersService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getOne(id: User['id']) {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`User ${id} not found`);

    return user;
  }
  async getAll() {
    const users = await this.userModel.find().exec();
    if (users.length == 0) throw new NotFoundException(`Users not found`);

    return users;
  }
  async create(payload: CreateUserDto) {
    const entity = new this.userModel(payload);
    const user = await entity.save();
    return user;
  }
  update(id: User['id'], payload: UpdateUserDto) {
    const user = this.userModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!user) throw new NotFoundException(`User ${id} not found`);

    return user;
  }
  modify(id: User['id'], payload: PatchUserDto) {
    const user = this.userModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!user) throw new NotFoundException(`User ${id} not found`);

    return user;
  }
  remove(id: User['id']) {
    const user = this.userModel.findByIdAndDelete(id);
    return user;
  }
}
