import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormDto, CreateFormFieldsDto } from './dto/create-form.dto';
import { Form } from './entities/form.entity';
import { FormField } from './entities/form_field.entity';
import { RequisitionFields } from './entities/requisition_fields.entity';
import { UpdateFieldDto } from './dto/update-field';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form) // user //,
    private readonly formRepository: Repository<Form>,
    @InjectRepository(FormField) // user //,
    private readonly formFieldsRepository: Repository<FormField>,
    @InjectRepository(RequisitionFields)
    private readonly userFormRepository: Repository<RequisitionFields>,
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
    const res_forms = await this.formRepository
      .createQueryBuilder('form')
      .where('team_id = :team_id', { team_id: team_id })
      .leftJoinAndSelect('form.form_field', 'form_field')
      .andWhere('form_field.archive = :archive', { archive: archive })
      .getOne();

    return res_forms;
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
      date: new Date(),
      description: 'description',
    });
  }

  // async updateForm(id: number, UpdateFormDto: UpdateFormDto) {
  //    return await this.formRepository.update(id, UpdateFormDto)
  //   }

  async createFormField(createFormFieldsDto: CreateFormFieldsDto) {
    const field = await this.formFieldsRepository.save({
      ...createFormFieldsDto,
    });

    return field;
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
  async fetchRequisitionForm(req_id: number) {
    const users = await this.formRepository
      .createQueryBuilder('form')
      .leftJoinAndSelect('form.form_field', 'form_fields')
      .leftJoinAndSelect('form_fields.requisition_field', 'req_field')
      .leftJoin('req_field.requisition', 'requisition')
      .where('requisition.id = :id', { id: req_id })
      .getOne();

    return users;
  }
}
