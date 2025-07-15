import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { companySchema, vacancySchema } from 'src/companies/schema/company.schema';

@Module({
  imports : [
    MongooseModule.forFeature([
      {schema : companySchema , name : "company"},
      {schema : vacancySchema , name : "vacancy"},
    ])
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
