import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from './../../entities/customers.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  ModifyCustomerDto,
} from './../../dtos/customers.dto';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [];
  private counter = 1;

  private getIndex(id: number) {
    return this.customers.findIndex((e) => e.id === id);
  }

  getAll() {
    const list = this.customers;
    if (list.length === 0) throw new NotFoundException(`Customers not found`);

    return list;
  }
  getOne(id: number) {
    const customer = this.customers.find((e) => e.id === id);
    if (!customer) throw new NotFoundException(`Customer ${id} not found`);

    return customer;
  }
  createOne(payload: CreateCustomerDto) {
    const newCustomer: Customer = {
      id: this.counter,
      ...payload,
    };
    this.customers.push(newCustomer);
    this.counter++;

    return newCustomer;
  }
  modifyOne(id: number, payload: ModifyCustomerDto) {
    const index = this.getIndex(id);
    const customer = this.customers[index];
    if (!customer) throw new NotFoundException(`Customer ${id} not found`);

    const customerModified: Customer = {
      ...customer,
      ...payload,
    };
    this.customers[index] = customerModified;

    return customerModified;
  }
  updateOne(id: number, payload: UpdateCustomerDto) {
    const index = this.getIndex(id);
    const customer = this.customers[index];
    if (!customer) throw new NotFoundException(`Customer ${id} not found`);

    const customerUpdated: Customer = {
      id: customer.id,
      ...payload,
    };
    this.customers[index];

    return customerUpdated;
  }
  removeOne(id: number) {
    const index = this.getIndex(id);
    if (!index) throw new NotFoundException(`Customer ${id} not found`);

    return this.customers.splice(index, 1);
  }
}
