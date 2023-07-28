import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './../../entities/users.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  PatchUserDto,
} from '../../dtos/users.dto';

@Injectable()
export class UsersService {
  private counter = 1;
  private users: User[] = [];

  getOne(id: number) {
    const user = this.users.find((e) => e.id === id);
    if (!user) throw new NotFoundException(`User ${id} not found`);

    return user;
  }
  create(payload: CreateUserDto) {
    const newUser: User = {
      id: this.counter,
      ...payload,
    };
    this.users.push(newUser);
    this.counter++;

    return newUser;
  }
  update(id: number, payload: UpdateUserDto) {
    const index = this.users.findIndex((e) => e.id === id);
    const userOld = this.users.at(index);
    if (!userOld) throw new NotFoundException(`User ${id} not found`);

    this.users[index] = {
      id: userOld.id,
      ...payload,
    };

    return this.users.at(index);
  }
  modify(id: number, payload: PatchUserDto) {
    const index = this.users.findIndex((e) => e.id === id);
    const userOld = this.users.at(index);
    if (!userOld) throw new NotFoundException(`User ${id} not found`);

    const userMod = {
      ...userOld,
      ...payload,
    };
    this.users[index] = userMod;

    return this.users.at(index);
  }
  remove(id: number) {
    const index = this.users.findIndex((e) => e.id === id);
    if (!index) throw new NotFoundException(`User ${id} not found`);

    return this.users.splice(index, 1);
  }
}
