import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserFunction } from './entities/user_function.entity';
import { TeamFunction } from './entities/function.entity';
import { Team } from '../teams/entities/team.entity';
import { Achievement } from './entities/achievement.entity';
import { TeamsService } from '../teams/teams.service';
import { Requisitions } from '../teams/entities/requisition.entity';
import { Dictionary } from '../general/entities/dictionary.entity';
import { Form } from '../forms/entities/form.entity';
import { RequisitionFields } from '../forms/entities/requisition_fields.entity';
import { FormField } from '../forms/entities/form_field.entity';
import { GeneralService } from '../general/general.service';
import { FormsService } from '../forms/forms.service';
import { TeamPhoto } from '../teams/entities/team-photo.entity';
import { UploadsService } from '../uploads/uploads.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserFunction,
      TeamFunction,
      Team,
      Achievement,
      Requisitions,
      Function,
      TeamPhoto,

      Form,
      Dictionary,
      FormField,

      RequisitionFields,
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    TeamsService,
    GeneralService,
    FormsService,
    UploadsService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
