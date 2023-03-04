import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';

@Injectable()
export class LocalAuthGuard implements CanActivate {

    constructor(private readonly usersService: UsersService) {

    }
    async canActivate(context: ExecutionContext) {
        
        // console.log(context.switchToHttp().getRequest().session)
        const user = await this.usersService.findById(context.switchToHttp().getRequest().session.user_id);
        if (user && context.switchToHttp().getRequest().session.logged) {
            return true;
        }    
        return false;
    }
}