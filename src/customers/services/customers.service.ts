import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Customer } from './../entities/customers.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  ModifyCustomerDto,
} from './../dtos/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async getAll() {
    const customers = await this.customerModel.find().exec();
    if (customers.length === 0)
      throw new NotFoundException('Customers not found');

    return customers;
  }
  async getOne(id: Customer['id']) {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) throw new NotFoundException(`Customer ${id} not found`);

    return customer;
  }
  async createOne(payload: CreateCustomerDto) {
    const toCreate = new this.customerModel(payload);
    const customer = await toCreate.save();

    return customer;
  }
  async modifyOne(id: Customer['id'], payload: ModifyCustomerDto) {
    const customer = await this.customerModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!customer) throw new NotFoundException(`Customer ${id} not found`);

    return customer;
  }
  async updateOne(id: Customer['id'], payload: UpdateCustomerDto) {
    const customer = await this.customerModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!customer) throw new NotFoundException(`Customer ${id} not found`);

    return customer;
  }
  async removeOne(id: Customer['id']) {
    const customer = await this.customerModel.findByIdAndDelete(id);
    if (!customer) throw new NotFoundException(`Customer ${id} not found`);

    return customer;
  }
}
