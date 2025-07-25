import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { IsAuthGuard } from 'src/auth/guards/isAuth.guard';
import { IsAdmin } from './guards/isAdmin.guard';
import { companyApproval } from 'src/companies/dto/companyApproval.dto';

@Controller('admin')
@UseGuards(IsAuthGuard ,IsAdmin)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('companies')
  getAllCompanies (@Query() status : companyApproval){
    return this.adminService.getAllCompanies(status)
  }

  @Get('company/:id')
  getCompany (@Param('id') id : string){
    return this.adminService.getCompany(id)
  }
  
  @Get("vacancies")
  getVacancies(){
    return this.adminService.getVacancies()
  }
  @Get('vacancy/:id')
  getVacancy (@Param('id') id : string){
    return this.adminService.getVacancy(id)
  }

  @Get("users")
  getUsers(){
    return this.adminService.getUsers()
  }

  @Patch('company-approval/:id')
  companyApproval(@Param('id') companyId : string , @Body() status : companyApproval ){
    return this.adminService.companyApproval(status , companyId)
  }
  @Patch('vacancy-approval/:id')
  vacancyApproval(@Param('id') vacancyId : string , @Body() status : companyApproval){
    return this.adminService.vacancyApproval(status , vacancyId)
  }
}
