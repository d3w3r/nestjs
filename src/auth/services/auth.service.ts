import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './../../users/services/users.service';
import { User } from './../../users/entities/users.entity';
import { PayloadToken } from './../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(nickname: string, password: string) {
    const user = await this.usersService.findByEmail(nickname);

    if (!user) throw new NotFoundException();

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) return user;
    else return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = {
      // role: user.role
      role: '1',
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
