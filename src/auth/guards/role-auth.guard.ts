import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { ROLES_KEY } from './../decorators/roles.decorator';
import { PayloadToken } from './../models/token.model';
import { Role } from './../models/roles.model';

@Injectable()
export class RoleAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    if (!roles) return true; // No se difinieron roles para la ruta

    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    const hasAccess = roles.some((role) => role === user.role);

    if (!hasAccess)
      throw new UnauthorizedException('Tu rol no tiene acceso para el recurso');

    return hasAccess;
  }
}
