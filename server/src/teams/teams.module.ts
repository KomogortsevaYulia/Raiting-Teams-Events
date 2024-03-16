import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserFunction } from '../users/entities/user_function.entity';
import { TeamFunction } from '../users/entities/function.entity';
import { UsersService } from '../users/users.service';
import { UploadsService } from '../uploads/uploads.service';
import { Requisitions } from './entities/requisition.entity';
import { Dictionary } from '../general/entities/dictionary.entity';
import { GeneralService } from '../general/general.service';
import { Form } from '../forms/entities/form.entity';
import { RequisitionFields } from 'src/forms/entities/requisition_fields.entity';
import { FormField } from 'src/forms/entities/form_field.entity';
import { FormsService } from 'src/forms/forms.service';
import { TeamPhoto } from './entities/team-photo.entity';

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
    ]),
  ],
  controllers: [TeamsController],
  providers: [
    TeamsService,
    UsersService,
    UploadsService,
    GeneralService,
    FormsService,
  ],
  exports: [TeamsService],
})
export class TeamsModule {}
