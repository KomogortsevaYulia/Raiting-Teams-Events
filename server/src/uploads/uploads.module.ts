import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { EventsService } from 'src/events/events.service';
import { Journal } from 'src/events/entities/journal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Journal])],
  controllers: [UploadsController],
  providers: [UploadsService, EventsService],
})
export class UploadsModule {}
