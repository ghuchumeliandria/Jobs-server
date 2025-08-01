import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Resumes } from './schema/resume.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class ResumeService {
    constructor(
        @InjectModel("resumes") private resumeModel : Model<Resumes>,
    ){}

   async getResume(id : string){
        if(!isValidObjectId(id)) throw new BadRequestException("invalid id")
        const resume = await this.resumeModel.findById(id)
        return resume
    }
}
