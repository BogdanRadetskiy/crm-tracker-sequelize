import { StatisticRequestDto } from '@modules/statistic/dto';
import { Injectable } from '@nestjs/common';

import { UserService } from '@modules/user/user.service';
import { ProjectService } from './../project/project.service';
import { LoggedDayService } from '@modules/loggedDay/logged-day.service';
import { StatisticHeaderResponseDto } from '@modules/statistic/dto/response';
import { LoggedDayStatistic, ProjectStatistic, UserStatistic } from '@common/types/statistic';

@Injectable()
export class StatisticService {
  constructor(
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
    private readonly loggedDayService: LoggedDayService,
  ) {}
  async getCount(params: StatisticRequestDto): Promise<StatisticHeaderResponseDto> {
    const [projectsCount, usersCount, hours] = await Promise.all([
      this.projectService.getCount(params.userId, params.projectId),
      this.userService.getCount(params.userId, params.projectId),
      this.loggedDayService.getHours(params.userId, params.projectId),
    ]);
    return {
      projectsCount,
      usersCount,
      hours,
    };
  }
  async getByGrouped(
    params: StatisticRequestDto,
  ): Promise<UserStatistic[] | ProjectStatistic[] | LoggedDayStatistic[]> {
    return await this.projectService.getByGrouped(params.userId, params.projectId);
  }
}
