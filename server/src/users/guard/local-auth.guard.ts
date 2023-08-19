import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class LocalAuthGuard implements CanActivate {

    constructor(private readonly usersService: UsersService,
        private reflector: Reflector) {

    }
    async canActivate(context: ExecutionContext) {

        // console.log(context.switchToHttp().getRequest().session)
        const session = context.switchToHttp().getRequest().session
        const user = await this.usersService.findById(session.user_id);
        // вошел ли юзер?
        if (user && session.logged) {
            return true
        }

        return false;
    }
}