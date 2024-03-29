import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserFunction } from '../users/entities/user_function.entity';
import { Function } from '../users/entities/function.entity';
import { UsersService } from '../users/users.service';
import { UploadsService } from '../uploads/uploads.service';
import { Requisitions } from './entities/requisition.entity';
import { Dictionary } from '../general/entities/dictionary.entity';
import { GeneralService } from '../general/general.service';
import { Form } from '../forms/entities/form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, User, UserFunction, Function, Requisitions, Dictionary, Form])],
  controllers: [TeamsController],
  providers: [TeamsService, UsersService, UploadsService, GeneralService],
})
export class TeamsModule {}
