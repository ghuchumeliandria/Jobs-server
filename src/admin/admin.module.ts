import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { companySchema, vacancySchema } from 'src/companies/schema/company.schema';
import { userSchema } from 'src/users/schema/users.schema';

@Module({
  imports : [
    MongooseModule.forFeature([
      {schema : companySchema , name : "company"},
      {schema : vacancySchema , name : "vacancy"},
      {schema : userSchema , name : "user"}
    ])
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
