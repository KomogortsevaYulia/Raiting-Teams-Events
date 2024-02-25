import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchVisitsDto } from './dto/search-visits.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamSchedule } from './entities/schedule.entity';
import { UpdateVisitsDto } from './dto/update-visits.dto';
import { UsersService } from '../users/users.service';
import { TeamVisits } from './entities/visits.entity';
import { Cabinets } from './entities/cabinets.entity';
import { GetAllCabinetsResponse } from './dto/get-all-cabinets.response';
import { CreateCabinetDto } from './dto/create-cabinet.dto';
import { CreateCabinetResponse } from './dto/create-cabinet.response';
import { DeleteCabinetResponse } from './dto/delete-cabinet.response';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(TeamSchedule) // user //,
    private readonly teamSchedRepository: Repository<TeamSchedule>,
    @InjectRepository(TeamVisits) // user //,
    private readonly teamVisitsRepository: Repository<TeamVisits>,
    @InjectRepository(Cabinets)
    private readonly cabinetsRepository: Repository<Cabinets>,
    private readonly usersService: UsersService,
  ) {}

  async findVisits(searchVisitsDto: SearchVisitsDto) {
    const res = this.teamSchedRepository
      .createQueryBuilder('team_schedule')
      .select([
        'team_schedule.id',
        'user.id',
        'user.fullname',
        'user.education_group',
        'team_visits.id',
        'team_visits.status_visit',
        'team_visits.date_visit',
      ])
      .leftJoin('team_schedule.team', 'team')
      .leftJoin('team_schedule.team_visits', 'team_visits')
      .leftJoin('team_visits.user', 'user')
      .where('team.id = :team_id', { team_id: searchVisitsDto.team_id })
      .andWhere(
        'team_visits.date_visit >= :date_start and team_visits.date_visit <= :date_end',
        {
          date_start: searchVisitsDto.date_visit_start,
          date_end: searchVisitsDto.date_visit_end,
        },
      );

    return await res.getOne();
  }

  async updateVisit(updateVisitsDto: UpdateVisitsDto) {
    let res;

    const existingVisit = await this.teamVisitsRepository
      .createQueryBuilder('team_visits')
      .leftJoin('team_visits.team_schedule', 'team_schedule')
      .leftJoin('team_schedule.team', 'team')
      .leftJoin('team_visits.user', 'user')
      .where('team.id = :team_id', { team_id: updateVisitsDto.team_id })
      .andWhere('team_visits.date_visit = :date_visit', {
        date_visit: updateVisitsDto.date_visit,
      })
      .andWhere('user.id = :user_id', {
        user_id: updateVisitsDto.user_id,
      })
      .getOne();
    // console.log(updateVisitsDto, existingVisit)
    // existing Visit
    if (existingVisit) {
      res = this.teamVisitsRepository.update(existingVisit.id, {
        status_visit: updateVisitsDto.status_visit,
        comment: updateVisitsDto.comment,
      });
    } else {
      const user = await this.usersService.findOne(updateVisitsDto.user_id);
      const team_schedule = await this.teamSchedRepository
        .createQueryBuilder('team_schedule')
        .leftJoin('team_schedule.team', 'team')
        .where('team.id = :team_id', { team_id: updateVisitsDto.team_id })
        .getOne();

      res = this.teamVisitsRepository.insert({
        user: user,
        status_visit: updateVisitsDto.status_visit,
        date_visit: updateVisitsDto.date_visit,
        team_schedule: team_schedule,
        comment: updateVisitsDto.comment,
      });
    }

    return res;
  }

  public async getAllCabinets(): Promise<GetAllCabinetsResponse> {
    const cabinets = await this.cabinetsRepository.find();

    return {
      cabinets,
    };
  }

  public async createCabinet(
    dto: CreateCabinetDto,
  ): Promise<CreateCabinetResponse> {
    const newCabinet = await this.cabinetsRepository.save(dto);

    return {
      cabinet: newCabinet,
    };
  }

  public async deleteCabinet(id: number): Promise<DeleteCabinetResponse> {
    const result = await this.cabinetsRepository.delete(id);
    const message = 'Кабинет успешно удален';

    if (result.affected === 0) {
      throw new NotFoundException(`Кабинет не найден!`);
    }

    return { message };
  }
}
