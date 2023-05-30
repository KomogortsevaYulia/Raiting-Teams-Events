import { Module } from '@nestjs/common';
import { FunctionsService } from './functions.service';
import { FunctionsController } from './functions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requisitions } from 'src/teams/entities/requisition.entity';
import { Team } from 'src/teams/entities/team.entity';
import { User } from 'src/users/entities/user.entity';
import { UserFunction } from 'src/users/entities/user_function.entity';
import { Form } from 'src/forms/entities/form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, User, UserFunction, Function, Requisitions, Form])],
  controllers: [FunctionsController],
  providers: [FunctionsService]
})
export class FunctionsModule {}
