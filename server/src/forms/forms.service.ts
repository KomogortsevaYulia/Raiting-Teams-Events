import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormDto, CreateFormFieldsDto } from './dto/create-form.dto';
import { Form } from './entities/form.entity';
import { FormField } from './entities/form_field.entity';
import { RequisitionFields } from './entities/requisition_fields.entity';
import { UpdateFieldDto } from './dto/update-field';
import { RequisitionFieldsC } from './dto/create-requisition.dto';
import { Requisitions } from '../teams/entities/requisition.entity';
import { FindRequisitionDto } from './dto/find-requisition.dto';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form) // user //,
    private readonly formRepository: Repository<Form>,
    @InjectRepository(FormField) // user //,
    private readonly formFieldsRepository: Repository<FormField>,
  ) {}

  async findOnIdForm(team_id: number) {
    const res_forms = await this.formRepository
      .createQueryBuilder('form')
      .where('team_id = :team_id', { team_id: team_id })
      .getOne();
    return res_forms.id;
  }

  async findOnFormFields(team_id: number) {
    const archive = false;
    return await this.formRepository
      .createQueryBuilder('form')
      .where('team_id = :team_id', { team_id: team_id })
      .leftJoinAndSelect('form.form_field', 'form_field')
      .andWhere('form_field.archive = :archive', { archive: archive })
      .getOne();
  }

  // TODO feat make create user form
  // async createFormUser(
  //   createUserFormDto: createUserFormDto,
  // ): Promise<RequisitionFields> {
  //   const userForm = await this.userFormRepository.save({
  //     // ...createUserFormDto,
  //     // value: createUserFormDto.value,
  //     // user: createUserFormDto.user,
  //     // field: createUserFormDto.field,
  //     // date: new Date()
  //   });
  //
  //   return userForm;
  // }

  async createForm(createFormDto: CreateFormDto): Promise<Form> {
    return await this.formRepository.save({
      ...createFormDto,
      order: new Date(),
      description: 'description',
    });
  }

  // async updateForm(id: number, UpdateFormDto: UpdateFormDto) {
  //    return await this.formRepository.update(id, UpdateFormDto)
  //   }

  async createFormField(createFormFieldsDto: CreateFormFieldsDto) {
    return await this.formFieldsRepository.save({
      ...createFormFieldsDto,
    });
  }

  async updateFormField(field_id: number, updateFieldDto: UpdateFieldDto) {
    return await this.formFieldsRepository.update(field_id, {
      ...updateFieldDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }

  // получить ответы пользователей на анкету
  async findRequisitionForm(req_id: number) {
    let query = this.formRepository
      .createQueryBuilder('form')
      .leftJoinAndSelect('form.form_field', 'form_fields')
      .leftJoinAndSelect('form_fields.requisition_field', 'req_field')
      .leftJoin('req_field.requisition', 'requisition')
      .andWhere('requisition.id = :id', {
        id: req_id,
      });
    return query.getOne();
  }
}
