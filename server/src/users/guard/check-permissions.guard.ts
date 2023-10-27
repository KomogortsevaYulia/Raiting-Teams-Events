import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Reflector } from '@nestjs/core';
import { User } from '../entities/user.entity';
import { Permissions } from '../../shared/permissions';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    // console.log(context.switchToHttp().getRequest().session)
    const session = context.switchToHttp().getRequest().session;
    const user = new User();
    user.userId = session.user_id;

    // запросить разрешения с декоратора
    const requiredPermissions = this.reflector.get<Permissions[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions) {
      return true; // no permissions required, allow access
    }

    return this.usersService.checkPermissions(user, requiredPermissions);
  }
}
