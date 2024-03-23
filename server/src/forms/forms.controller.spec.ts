import { Test, TestingModule } from '@nestjs/testing';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { CreateFormFieldsDto } from './dto/create-form.dto';
import { Form } from './entities/form.entity';
import { FormField } from './entities/form_field.entity';
import { RequisitionFields } from './entities/requisition_fields.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FormsController', () => {
  let controller: FormsController;
  let service: FormsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormsController],
      providers: [
        FormsService,
        {
          provide: getRepositoryToken(Form),
          useValue: {},
        },
        {
          provide: getRepositoryToken(FormField),
          useValue: {},
        },
        {
          provide: getRepositoryToken(RequisitionFields),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<FormsController>(FormsController);
    service = module.get<FormsService>(FormsService);
  });

  describe('create', () => {
    it('should create a new form', () => {
      const createFormDto: Omit<CreateFormDto, 'id' | 'date' | 'description'> =
        {
          fields_id: 'string',
          team_id: 7,
        };

      const expectedResult: Form = {
        ...createFormDto,
        id: expect.any(Number),
        order: expect.any(Date),
        description: expect.any(String),
      };

      jest.spyOn(service, 'createForm').mockResolvedValue(expectedResult);

      return expect(controller.create(createFormDto)).resolves.toEqual(
        expectedResult,
      );
    });
  });

  // describe('update', () => {
  //   it('should update a form', () => {
  //     const idForm =
  //     const updateFormDto: UpdateFormDto = { /* fill with valid data */ }
  //     const expectedResult = /* define expected result here */

  //     jest.spyOn(service, 'updateForm').mockResolvedValue(expectedResult)

  //     expect(controller.update(idForm, updateFormDto)).resolves.toEqual(expectedResult);
  //     expect(service.updateForm).toHaveBeenCalledWith(idForm, updateFormDto);
  //   });
  // });

  describe('createFormField', () => {
    it('should create a new form field', () => {
      const createFormFieldsDto: Omit<CreateFormFieldsDto, 'id'> = {
        title: 'string',
        required: true,
      };

      const expectedResult: FormField = {
        ...createFormFieldsDto,
        id: expect.any(Number),
      };

      jest.spyOn(service, 'createFormField').mockResolvedValue(expectedResult);

      return expect(
        controller.createFormField(createFormFieldsDto),
      ).resolves.toEqual(expectedResult);
    });
  });

  describe('findOnFormFields', () => {
    it('should get the list of form fields by team_id', () => {
      const team_id = 15;
      const expectedResult = [
        {
          id: 3,
          title: 'Ты мужчина?',
          required: false,
        },
        {
          id: 4,
          title: 'Ты студент?',
          required: false,
        },
        {
          id: 1,
          title: 'Был ли у вас опыт работы с детьми?',
          required: true,
        },
        {
          id: 2,
          title: 'Назовите вашу самую характерную черту.\n',
          required: true,
        },
        {
          id: 5,
          title: 'Что является вашим главным недостатком?\n',
          required: true,
        },
      ];

      jest.spyOn(service, 'findOnFormFields').mockResolvedValue(expectedResult);

      return expect(controller.findOnFormFields(team_id)).resolves.toEqual(
        expectedResult,
      );
    });
  });

  describe('findOnIdForm', () => {
    it('should get the form id by team_id', () => {
      const team_id = 15;
      const expectedResult = 10;

      jest.spyOn(service, 'findOnIdForm').mockResolvedValue(expectedResult);

      return expect(controller.findOnIdForm(team_id)).resolves.toEqual(
        expectedResult,
      );
    });
  });
});
