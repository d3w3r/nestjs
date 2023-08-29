import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async getAll() {
    const users = await this.userRepo.find();

    if (users.length === 0) throw new NotFoundException(`Users not found`);

    return users;
  }
  async getOne(id: number, verbose = false) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) throw new NotFoundException(`User ${id} not found`);

    if (verbose) {
      const { customerID, ...userCopy } = user;
      const customer = await this.customersService.getOne(customerID);

      const newUser = {
        ...userCopy,
        customer,
      };

      return newUser;
    }

    return user;
  }
  async create(payload: CreateUserDto) {
    const { customerID } = payload;

    const customer = await this.customersService.getOne(customerID);

    if (!customer)
      throw new NotFoundException(
        `Customer ${customerID} in the user doesn't exist`,
      );

    const customerCreated = this.userRepo.create(payload);

    return this.userRepo.save(customerCreated);
  }
  async update(id: number, payload: UpdateUserDto) {
    const user = await this.getOne(id);

    if (!user) throw new NotFoundException(`User ${id} not found`);

    const { customerID } = payload;

    const customer = await this.customersService.getOne(customerID);

    if (!customer)
      throw new NotFoundException(
        `Customer ${customerID} in the user doesn't exist`,
      );

    const userUpdate = this.userRepo.merge(user as User, payload);
    await this.userRepo.update(id, userUpdate);

    return userUpdate;
  }
  async modify(id: number, payload: PatchUserDto) {
    const user = await this.getOne(id);

    if (!user) throw new NotFoundException(`User ${id} not found`);

    const { customerID } = payload;

    const customer = await this.customersService.getOne(customerID);

    if (!customer)
      throw new NotFoundException(
        `Customer ${customerID} in the user doesn't exist`,
      );

    const userUpdate = this.userRepo.merge(user as User, payload);
    await this.userRepo.update(id, userUpdate);

    return userUpdate;
  }
  async remove(id: number) {
    const user = await this.getOne(id);

    if (!user) throw new NotFoundException(`User ${id} not found`);

    await this.userRepo.delete(id);

    return user;
  }

  // getOrderByUser(id: number) {
  //   const user = this.getOne(id);
  //   return {
  //     date: new Date(),
  //     user,
  //     products: this.productsService.findAll(),
  //   };
  // }
}
