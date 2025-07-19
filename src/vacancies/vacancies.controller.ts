import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { VanaciesService } from './vacancies.service';
import { IsAuthGuard } from 'src/auth/guards/isAuth.guard';
import { VacancyFilter } from './dto/vacancyFilter.dto';
import { PDF } from './dto/pdf.dto';
import { UserId } from 'src/decorators/userOrCompanyId';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('vacancies')

export class VanaciesController {
  constructor(private readonly vanaciesService: VanaciesService) {}

  @Get()
  getAllVacancy(@Query() filterFields : VacancyFilter){
    return this.vanaciesService.getAllVacancy(filterFields)
  }
  @UseGuards(IsAuthGuard)
  @Post('/:id/apply')
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@Param("id") vacancyId : string ,  @UserId() userId : string , @UploadedFile() file : Express.Multer.File){
    return this.vanaciesService.addFileInResume(vacancyId , file , userId)
  }
  @UseGuards(IsAuthGuard)
  @Post('get-file')
  getFile(@Body('fileId') fileId : string){
    return this.vanaciesService.getFile(fileId)
  }
  @UseGuards(IsAuthGuard)
  @Delete('delete-file')
  deleteFile(@Body('fileId') fileId : string){
    return this.vanaciesService.deleteFile(fileId)
  }
}
