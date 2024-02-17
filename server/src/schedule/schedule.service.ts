import { Injectable } from '@nestjs/common';
import { SearchVisitsDto } from './dto/search-visits.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamSchedule } from './entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(TeamSchedule) // user //,
    private readonly teamSchedRepository: Repository<TeamSchedule>,
  ) {}

  // create(createScheduleDto: CreateScheduleDto) {
  //   return 'This action adds a new schedule';
  // }

  findAll() {
    return `This action returns all schedule`;
  }

  async findOne(searchVisitsDto: SearchVisitsDto) {
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

  // update(id: number, updateScheduleDto: UpdateScheduleDto) {
  //   return `This action updates a #${id} schedule`;
  // }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
