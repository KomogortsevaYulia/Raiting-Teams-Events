import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { FormField } from './entities/form_field.entity';
import { UserForms } from './entities/user_forms.entity';
import { Form } from './entities/form.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FormField, Form, UserForms])],
  controllers: [FormsController],
  providers: [FormsService]
})
export class FormsModule {}
