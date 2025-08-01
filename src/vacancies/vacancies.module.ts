import { Module } from '@nestjs/common';
import { VanaciesService } from './vacancies.service';
import { VanaciesController } from './vacancies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { vacancySchema } from 'src/companies/schema/company.schema';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';
import { userSchema } from 'src/users/schema/users.schema';
import { resumeSchema } from 'src/resume/schema/resume.schema';

@Module({
  imports : [AwsS3Module,
    MongooseModule.forFeature([
      {schema : vacancySchema , name : 'vacancy'},
      {schema : userSchema , name : 'user'},
      {schema : resumeSchema , name : 'resumes'}
    ])
  ],
  controllers: [VanaciesController],
  providers: [VanaciesService],
})
export class VanaciesModule {}
