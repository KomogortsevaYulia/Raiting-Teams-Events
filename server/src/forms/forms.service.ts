import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { createUserFormDto } from './dto/create-form.dto';
import { createFormDto } from './dto/create-form.dto';
import { createFormFieldsDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './entities/form.entity';
import { FormField } from './entities/form_field.entity';
import { UserForms } from './entities/user_forms.entity';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)  // user //,
    private readonly formRepository: Repository<Form>,
    @InjectRepository(FormField)  // user //,
    private readonly formFieldsRepository: Repository<FormField>,
    @InjectRepository(UserForms)  
    private readonly userFormRepository: Repository<UserForms>
  ) { }

  findAll() {
  }

  async findOnIdForm(team_id: number) {

    let res_forms = await this.formRepository
      .createQueryBuilder("form")
      .where("team_id = :team_id", {team_id: team_id})
      .getOne()
    let res_form_str = res_forms.id
  
    return res_form_str;
  }

  async findOnFormFields(team_id: number) {

    let res_forms = await this.formRepository
      .createQueryBuilder("form")
      .where("team_id = :team_id", {team_id: team_id})
      .getOne()
    let res_form_str = res_forms.fields_id[0].toString()
    let fieldsIds = res_form_str
    .split('\n')
    .map(value => {
      let parsedValue = parseInt(value, 10);
      return isNaN(parsedValue) ? null : parsedValue;
    });
    let res_fields_form = await this.formFieldsRepository
      .createQueryBuilder("form_fields")
      .where("id = any(:ids)", {ids:fieldsIds})
      .getMany()
    return res_fields_form;
  }

  async createFormUser(createUserFormDto: createUserFormDto): Promise<UserForms> {

    let userForm = await this.userFormRepository.save({
      // ...createUserFormDto,
      // value: createUserFormDto.value,
      // user: createUserFormDto.user,
      // field: createUserFormDto.field,
      // date: new Date()
    })

    return userForm;
  }

  async createForm(createFormDto: createFormDto): Promise<Form> {

    let form = await this.formRepository.save({
      ...createFormDto,
      date: new Date(),
      fields_id: createFormDto.fields_id,
      description: "qwe",
      team_id: createFormDto.team_id
    })

    return form;
  }

  async updateForm(id: number, UpdateFormDto: UpdateFormDto) {
     return await this.formRepository.update(id, UpdateFormDto)
    }

  async createFormField(createFormFieldsDto: createFormFieldsDto) {

    let field = await this.formFieldsRepository.save({
      ...createFormFieldsDto,
      title: createFormFieldsDto.title,
      required: createFormFieldsDto.required
    })

    return field;
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
