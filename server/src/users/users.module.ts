import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserFunction } from './entities/user_function.entity';
import { TeamFunction } from './entities/function.entity';
import { Team } from '../teams/entities/team.entity';
import { Achievement } from './entities/achievement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserFunction,
      TeamFunction,
      Team,
      Achievement,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
