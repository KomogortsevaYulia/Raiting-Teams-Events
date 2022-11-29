import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserFunction } from '../users/entities/user_function.entity';
import { Function } from '../users/entities/function.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Team, User, UserFunction, Function])],
  controllers: [TeamsController],
  providers: [TeamsService]
})
export class TeamsModule {}
