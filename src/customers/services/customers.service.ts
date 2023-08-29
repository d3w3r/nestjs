import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from './../entities/customers.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  ModifyCustomerDto,
} from './../dtos/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  async getAll(offset: number, limit: number) {
    const customers = await this.customerRepo.find({
      skip: offset,
      take: limit,
    });

    if (customers.length === 0)
      throw new NotFoundException(`Customers not found`);

    return customers;
  }
  async getOne(id: number) {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) throw new NotFoundException(`Customer ${id} not found`);

    return customer;
  }
  async createOne(payload: CreateCustomerDto) {
    const customer = await this.customerRepo.create(payload);
    return this.customerRepo.save(customer);
  }
  async modifyOne(id: number, payload: ModifyCustomerDto) {
    const customer = await this.getOne(id);

    if (!customer) throw new NotFoundException(`Customer ${id} not found`);

    const modifyCustomer = this.customerRepo.merge(customer, payload);
    await this.customerRepo.update(id, modifyCustomer);

    return modifyCustomer;
  }
  async updateOne(id: number, payload: UpdateCustomerDto) {
    const customer = await this.getOne(id);

    if (!customer) throw new NotFoundException(`Customer ${id} not found`);

    const updateCustomer = this.customerRepo.merge(customer, payload);
    await this.customerRepo.update(id, updateCustomer);

    return updateCustomer;
  }
  async removeOne(id: number) {
    const customer = await this.getOne(id);

    if (!customer) throw new NotFoundException(`Customer ${id} not found`);

    await this.customerRepo.delete(id);

    return customer;
  }
}
