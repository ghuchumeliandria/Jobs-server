import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { resumeSchema } from './schema/resume.schema';

@Module({
  imports : [
      MongooseModule.forFeature([
        {schema : resumeSchema , name : 'resumes'}
      ])
    ],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
