import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { EventsService } from 'src/events/events.service';
import { Journal } from 'src/events/entities/journal.entity';
import { Dictionary } from 'src/general/entities/dictionary.entity';
import { GeneralService } from 'src/general/general.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Journal, Dictionary])],
  controllers: [UploadsController],
  providers: [UploadsService, EventsService, GeneralService],
})
export class UploadsModule {}
