import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { UserFunction } from './entities/user_function.entity';
import { Function } from './entities/function.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Role,UserFunction,Function])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
