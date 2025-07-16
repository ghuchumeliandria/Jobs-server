import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { IsAuthGuard } from 'src/auth/guards/isAuth.guard';
import { IsCompany } from './guards/isCompany.guard';
import { UserId } from 'src/decorators/userOrCompanyId';
import { IsApproved } from './guards/isApproved.guard';
import { AddVacancy } from './dto/addVacancy.dto';

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

  @Delete('vacancy-delete/:id')
  vacancyDelete(@Param('id') vacancyId : string , @UserId() companyId ){
    return this.companiesService.deleteVacancy(vacancyId , companyId)
  }
}
