import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { VanaciesService } from './vacancies.service';
import { IsAuthGuard } from 'src/auth/guards/isAuth.guard';
import { VacancyFilter } from './dto/vacancyFilter.dto';

@Controller('vacancies')
@UseGuards(IsAuthGuard)
export class VanaciesController {
  constructor(private readonly vanaciesService: VanaciesService) {}

  @Get()
  getAllVacancy(@Query() filterFields : VacancyFilter){
    return this.vanaciesService.getAllVacancy(filterFields)
  }
}
