import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from './../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'nickname',
      passwordField: 'password',
    });
    // By default passport takes [username, password]
  }

  async validate(nickname: string, password: string) {
    const user = await this.authService.validateUser(nickname, password);

    if (!user) {
      throw new UnauthorizedException('Not Allow');
    } else {
      const { password, ...rest } = user;
      return rest;
    }
  }
}
