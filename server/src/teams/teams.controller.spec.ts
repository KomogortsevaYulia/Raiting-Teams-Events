import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { UploadsService } from '../uploads/uploads.service';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Team } from './entities/team.entity';
import { UserFunction } from '../users/entities/user_function.entity';
import { TeamFunction } from '../users/entities/function.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

describe('TeamsController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let controller: TeamsController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [TypeOrmModule.forFeature([Team, User, UserFunction, Function])],

      controllers: [TeamsController],
      providers: [
        TeamsService,
        UsersService,
        UploadsService,
        {
          provide: getRepositoryToken(Team),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: getRepositoryToken(UserFunction),
          useValue: {},
        },
        {
          provide: getRepositoryToken(TeamFunction),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    controller = module.get<TeamsController>(TeamsController);
    //repositoryMock = module.get(getRepositoryToken(UserEntity));
  });

  describe('test Dto of create team', () => {
    const createTeamDto: CreateTeamDto = {
      userID: 5,
      shortname: 'dddd2',
      description: 'Хотим подняться на гору',
      title: 'hddddhh',
      document: 'hddddhh',
      charterTeam: 'dddddd',
      cabinet: '8',
    };

    it('Если краткое название коллектива превышает 50 символов, то пользователь получит предупреждение об ошибке', async () => {
      createTeamDto.shortname = 't'.repeat(51);
      const ofImportDto = plainToInstance(CreateTeamDto, createTeamDto);
      const errors = await validate(ofImportDto);
      expect(errors.length).not.toBe(0);
      expect(stringified(errors)).toContain(
        `Краткое название, максимальная длина текста 50`,
      );
    });

    it('Если название коллектива превышает 100 символов, то пользователь получит предупреждение об ошибке', async () => {
      createTeamDto.title = 't'.repeat(101);
      const ofImportDto = plainToInstance(CreateTeamDto, createTeamDto);
      const errors = await validate(ofImportDto);
      expect(errors.length).not.toBe(0);
      expect(stringified(errors)).toContain(
        `Название коллектива, максимальная длина текста 100`,
      );
    });

    it('Если описание коллектива превышает 3000 символов, то пользователь получит предупреждение об ошибке', async () => {
      createTeamDto.description = 't'.repeat(3001);
      const ofImportDto = plainToInstance(CreateTeamDto, createTeamDto);
      const errors = await validate(ofImportDto);
      // expect(errors.length).not.toBe(0)
      expect(stringified(errors)).toContain(
        `Описание, максимальная длина текста 3000`,
      );
    });

    it('Если руководитель не был передан в систему, то предупреждение об ошибке', async () => {
      createTeamDto.userID = null;
      const ofImportDto = plainToInstance(CreateTeamDto, createTeamDto);
      const errors = await validate(ofImportDto);
      expect(errors.length).not.toBe(0);
      expect(stringified(errors)).toContain(
        `userID must be a number conforming to the specified constraints`,
      );
    });
  });
});

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}
