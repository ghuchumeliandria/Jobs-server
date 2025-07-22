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

export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  getAllCompanies(){
    return this.companiesService.getAllCompany()
  }
  @UseGuards(IsAuthGuard , IsCompany , IsApproved )
  @Get("profile/:id")
  companyProfile(@Param('id') id : string ){
    return this.companiesService.companyProfile(id)
  }
  @UseGuards(IsAuthGuard , IsCompany , IsApproved )
  @Post("add-vacancy")
  addVacancy(@Body() addVacany : AddVacancy , @UserId() companyId : string ){
    return  this.companiesService.addVacancy(companyId , addVacany)
  }
  @UseGuards(IsAuthGuard , IsCompany , IsApproved )
  @UseGuards(CurrentCompany)
  @Delete('vacancy-delete/:id')
  vacancyDelete(@Param('id') vacancyId : string , @UserId() companyId : string ){
    return this.companiesService.deleteVacancy(vacancyId , companyId)
  }
  @UseGuards(IsAuthGuard , IsCompany , IsApproved )
  @UseGuards(CurrentCompany)
  @Patch('vacancy-update/:id')
  vacancyUpdate(@Param('id') vacancyId : string , @Body() updateVacancy : UpdateVacancy ){
    return this.companiesService.vacancyUpdate(vacancyId ,   updateVacancy)
  } 
  @UseGuards(IsAuthGuard , IsCompany , IsApproved )
  @Get('vacancies')
  pendingVacancies(@UserId() companyId : string , @Query()  status : Status){
    return this.companiesService.companyVacancies(companyId , status)
  }

}
