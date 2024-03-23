import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormDto, CreateFormFieldsDto } from './dto/create-form.dto';
import { Form } from './entities/form.entity';
import { FormField } from './entities/form_field.entity';
import { UpdateFieldDto } from './dto/update-field';
import { Team } from '../teams/entities/team.entity';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
    @InjectRepository(FormField)
    private readonly formFieldsRepository: Repository<FormField>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async findOnIdForm(team_id: number) {
    const res_forms = await this.formRepository
      .createQueryBuilder('form')
      .where('team_id = :team_id', { team_id: team_id })
      .getOne();
    return res_forms.id;
  }

  async findOnFormFields(team_id: number): Promise<Form | null> {
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
    const team = await this.teamRepository.findOneBy({
      id: createFormDto.team_id,
    });
    return await this.formRepository.save({
      team: team,
      date: new Date(),
      description: '-',
    });
  }

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
    const query = this.formRepository
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
