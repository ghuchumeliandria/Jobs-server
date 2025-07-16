import { Module } from '@nestjs/common';
import { VanaciesService } from './vacancies.service';
import { VanaciesController } from './vacancies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { vacancySchema } from 'src/companies/schema/company.schema';

@Module({
  imports : [
    MongooseModule.forFeature([
      {schema : vacancySchema , name : 'vacancy'}
    ])
  ],
  controllers: [VanaciesController],
  providers: [VanaciesService],
})
export class VanaciesModule {}
