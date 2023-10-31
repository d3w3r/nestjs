import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';

import { IS_PUBLIC_KEY } from './../decorators/public.decorator';
import config from './../../config';

@Injectable()
export class ApikeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('auth');
    const isAllowed = authHeader === this.configService.apikey;

    if (isAllowed === false) {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }
}
