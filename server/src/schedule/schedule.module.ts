import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TeamsService } from '../teams/teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../teams/entities/team.entity';
import { User } from '../users/entities/user.entity';
import { UserFunction } from '../users/entities/user_function.entity';
import { TeamFunction } from '../users/entities/function.entity';
import { Requisitions } from '../teams/entities/requisition.entity';
import { Dictionary } from '../general/entities/dictionary.entity';
import { Form } from '../forms/entities/form.entity';
import { RequisitionFields } from '../forms/entities/requisition_fields.entity';
import { FormField } from '../forms/entities/form_field.entity';
import { UsersService } from '../users/users.service';
import { GeneralService } from '../general/general.service';
import { FormsService } from '../forms/forms.service';
import { TeamSchedule } from './entities/schedule.entity';
import { TeamVisits } from './entities/visits.entity';
import { Cabinets } from './entities/cabinets.entity';
import { TeamPhoto } from '../teams/entities/team-photo.entity';
import { UploadsService } from '../uploads/uploads.service';
import { CabinetsTime } from './entities/cabinets-time.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Team,
      User,
      UserFunction,
      TeamFunction,
      Requisitions,
      Dictionary,
      Form,
      RequisitionFields,
      FormField,
      TeamPhoto,

      TeamSchedule,
      TeamVisits,
      CabinetsTime,
      Cabinets,
    ]),
  ],
  controllers: [ScheduleController],
  providers: [
    ScheduleService,
    TeamsService,
    UsersService,
    GeneralService,
    FormsService,
    UploadsService,
  ],
})
export class ScheduleModule {}
