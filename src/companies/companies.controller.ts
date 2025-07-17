import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { IsAuthGuard } from 'src/auth/guards/isAuth.guard';
import { IsCompany } from './guards/isCompany.guard';
import { UserId } from 'src/decorators/userOrCompanyId';
import { IsApproved } from './guards/isApproved.guard';
import { AddVacancy } from './dto/addVacancy.dto';
import { CurrentCompany } from './guards/currentCompany.guard';
import { UpdateVacancy } from './dto/updateVacancy.dto';
import { companyApproval } from './dto/companyApproval.dto';
import { Status } from 'src/dto/status.dto';

@Controller('company')
@UseGuards(IsAuthGuard , IsCompany , IsApproved )
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get("profile")
  companyProfile(@UserId() UserId : number ){
    return this.companiesService.companyProfile(UserId)
  }

  @Post("add-vacancy")
  addVacancy(@Body() addVacany : AddVacancy , @UserId() companyId : number ){
    return  this.companiesService.addVacancy(companyId , addVacany)
  }

  @UseGuards(CurrentCompany)
  @Delete('vacancy-delete/:id')
  vacancyDelete(@Param('id') vacancyId : string , @UserId() companyId : string ){
    return this.companiesService.deleteVacancy(vacancyId , companyId)
  }

  @UseGuards(CurrentCompany)
  @Patch('vacancy-update/:id')
  vacancyUpdate(@Param('id') vacancyId : string , @Body() updateVacancy : UpdateVacancy ){
    return this.companiesService.vacancyUpdate(vacancyId ,   updateVacancy)
  } 

  @Get('vacancies')
  pendingVacancies(@UserId() companyId : string , @Query()  status : Status){
    return this.companiesService.companyVacancies(companyId , status)
  }

  
}
