import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { VanaciesService } from './vacancies.service';
import { IsAuthGuard } from 'src/auth/guards/isAuth.guard';
import { VacancyFilter } from './dto/vacancyFilter.dto';
import { PDF } from './dto/pdf.dto';
import { UserId } from 'src/decorators/userOrCompanyId';

@Controller('vacancies')
@UseGuards(IsAuthGuard)
export class VanaciesController {
  constructor(private readonly vanaciesService: VanaciesService) {}

  @Get()
  getAllVacancy(@Query() filterFields : VacancyFilter){
    return this.vanaciesService.getAllVacancy(filterFields)
  }
  @Post('/:id/apply')
  addFileInResume(@Param("id") vacancyId : string , @Body() file : PDF , @UserId() userId : string){
    return this.vanaciesService.addFileInResume(vacancyId , file , userId)
  }
}
