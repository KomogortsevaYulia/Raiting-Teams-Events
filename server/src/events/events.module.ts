import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import {Event} from './entities/event.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { User } from 'src/users/entities/user.entity';
import { Journal } from './entities/journal.entity';
import { Dictionary } from 'src/general/entities/dictionary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event,Team,User,Journal, Dictionary])],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
