import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../utils/role';
import { ROLES_KEY } from '../decorators/role.decorator';
import { UsersService } from '../api/users/users.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly service: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;
    const { user } = context.switchToHttp().getRequest();
    const userDetails = await this.service.getUserDetails(user.uid);
    return requiredRoles.some((role) => userDetails.role.includes(role));
  }
}
