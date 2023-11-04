import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import {
  PatchUserDto,
  UpdateUserDto,
  // CreateUserDto,
  // ReviewUserDto,
} from './../dtos/users.dto';
import { User } from './../entities/users.entity';
import { CustomersService } from './../../customers/services/customers.service';
// import { ProductsService } from './../../products/services/products.service';
// import { Order } from './../../orders/entities/orders.entity';
// import { Customer } from './../../customers/entities/customers.entity';

@Injectable()
export class UsersService {
  constructor(
    private customersService: CustomersService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async getAll(limit = 10, offset = 0, verbose = false) {
    const configuration: FindManyOptions = {
      skip: offset,
      take: limit,
    };

    if (verbose) {
      configuration.relations = ['customerId'];
    }

    const users = await this.userRepo.find(configuration);

    if (users.length === 0) throw new NotFoundException(`Users Not Found`);

    return users;
  }
  async getOne(id: number, verbose = false) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) throw new NotFoundException(`User ${id} not found`);

    if (verbose) {
      const { customerId, ...userCopy } = user;
      const customer = await this.customersService.getOne(customerId);

      const newUser = {
        ...userCopy,
        customer,
      };

      return newUser;
    }

    return user;
  }
  async create(payload) {
    const { customerID } = payload;

    const customer = await this.customersService.getOne(customerID);

    if (!customer)
      throw new NotFoundException(
        `Customer ${customerID} in the user doesn't exist`,
      );

    payload.customer = customer;

    const hashPass = await bcrypt.hash(customer.fullname, 10);
    payload.password = hashPass;

    const customerCreated = this.userRepo.create(payload);

    return this.userRepo.save(customerCreated);
  }
  async update(id: number, payload: UpdateUserDto) {
    const user = await this.getOne(id);

    if (!user) throw new NotFoundException(`User ${id} not found`);

    const { customerId } = payload;

    const customer = await this.customersService.getOne(customerId);

    if (!customer)
      throw new NotFoundException(
        `Customer ${customerId} in the user doesn't exist`,
      );

    const userUpdate = this.userRepo.merge(user as User, payload);
    await this.userRepo.update(id, userUpdate);

    return userUpdate;
  }
  async modify(id: number, payload: PatchUserDto) {
    const user = await this.getOne(id);

    if (!user) throw new NotFoundException(`User ${id} not found`);

    const { customerId } = payload;

    const customer = await this.customersService.getOne(customerId);

    if (!customer)
      throw new NotFoundException(
        `Customer ${customerId} in the user doesn't exist`,
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
  findByEmail(nickname: string) {
    return this.userRepo.findOne({ where: { nickname } });
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
