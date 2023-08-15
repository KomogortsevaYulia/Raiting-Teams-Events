import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { FormField } from './entities/form_field.entity';
import { RequisitionFields } from './entities/requisition_fields.entity';
import { Form } from './entities/form.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Team } from 'src/teams/entities/team.entity';
import { UserFunction } from 'src/users/entities/user_function.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormField, Form, RequisitionFields, Team, User, UserFunction, Function])],
  controllers: [FormsController],
  providers: [FormsService, UsersService]
})
export class FormsModule {}
