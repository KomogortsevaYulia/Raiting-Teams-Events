import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { UploadsService } from '../uploads/uploads.service';
import { UsersService } from '../users/users.service';
import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { UserFunction } from '../users/entities/user_function.entity';
import { Function } from '../users/entities/function.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  // ...
}));

describe('TeamsController', () => {
  let controller: TeamsController;
  let service: TeamsService

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: TeamsService,
      useFactory: () => ({
        findAll: jest.fn(() => []),
      })
    }

    // let myRepository: jest.Mocked<Repository<Team>>;

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
          provide: getRepositoryToken(Function),
          useValue: {},
        },
      ],
    })
      .compile();

    service = module.get<TeamsService>(TeamsService);
    controller = module.get<TeamsController>(TeamsController);
    //repositoryMock = module.get(getRepositoryToken(UserEntity));
  });

  describe('create team', () => {

    const createTeamDto: CreateTeamDto = {
      "userID": null,
      "shortname": "dddd2",
      "description": "Хотим подняться на гору",
      "title": "hddddhh",
      "document": "hddddhh",
      "charterTeam": "dddddd",
      "cabinet": "8"

    };

    it('should throw error when userID is null', async () => {
      
      const ofImportDto = plainToInstance(CreateTeamDto, createTeamDto)
      const errors = await validate(ofImportDto)
      expect(errors.length).not.toBe(0)
      expect(stringified(errors)).toContain(`userID must be a number conforming to the specified constraints`)
    })

  });
});

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors)
}