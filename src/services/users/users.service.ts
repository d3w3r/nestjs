import { Injectable } from '@nestjs/common';

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

    this.users[index] = {
      id: userOld.id,
      ...payload,
    };

    return this.users.at(index);
  }
  modify(id: number, payload: PatchUserDto) {
    const index = this.users.findIndex((e) => e.id === id);
    const userOld = this.users.at(index);

    const userMod = {
      ...userOld,
      ...payload,
    };

    this.users[index] = userMod;

    return this.users.at(index);
  }
  remove(id: number) {
    const index = this.users.findIndex((e) => e.id === id);
    return this.users.splice(index, 1);
  }
}
