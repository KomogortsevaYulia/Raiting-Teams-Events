import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './entities/form.entity';
import { FormField } from './entities/form_field.entity';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)  // user //,
    private readonly formRepository: Repository<Form>,
    @InjectRepository(FormField)  // user //,
    private readonly formFieldsRepository: Repository<FormField>
  ) { }
  create(createFormDto: CreateFormDto) {
    return 'This action adds a new form';
  }

  findAll() {
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

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
    //let res_form_str = res_forms.fields_id.toString
    //let fieldsIds = res_form_str
    // .split('\n')
    // .map(value => {
    //   let parsedValue = parseInt(value, 10);
    //   return isNaN(parsedValue) ? null : parsedValue;
    // });
    // let res_fields_form = await this.formFieldsRepository
    //   .createQueryBuilder("form_fields")
    //   .where("id = any(:ids)", {ids:fieldsIds})
    //   .getMany()
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
