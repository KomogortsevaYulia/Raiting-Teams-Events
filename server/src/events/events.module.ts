import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { User } from 'src/users/entities/user.entity';
import { Journal } from './entities/journal.entity';
import { Dictionary } from 'src/general/entities/dictionary.entity';
import { UserFunction } from 'src/users/entities/user_function.entity';
import { UsersService } from 'src/users/users.service';
import { GeneralService } from 'src/general/general.service';
import { TeamFunction } from '../users/entities/function.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      Journal,
      Dictionary,
      Team,
      User,
      UserFunction,
      TeamFunction,
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService, UsersService, GeneralService],
})
export class EventsModule {}
