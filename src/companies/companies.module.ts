import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/users/schema/users.schema';
import { companySchema, vacancySchema } from './schema/company.schema';

@Module({
  imports : [
      MongooseModule.forFeature([
        {schema : userSchema , name : 'user'},
        {schema : companySchema , name : 'company'},
        {schema : vacancySchema , name : 'vacancy'}
      ])
    ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
