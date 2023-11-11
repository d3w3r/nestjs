import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from './../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(nickname: string, password: string) {
    const user = await this.usersService.findByEmail(nickname);

    if (!user) throw new NotFoundException();

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) return user;
    else return null;
  }
}
