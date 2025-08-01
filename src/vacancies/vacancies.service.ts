import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, isValidObjectId, Model } from 'mongoose';
import { Vacancy } from 'src/companies/schema/company.schema';
import { VacancyFilter } from './dto/vacancyFilter.dto';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/users/schema/users.schema';
import { Resumes } from 'src/resume/schema/resume.schema';
@Injectable()
export class VanaciesService {

    constructor(
        @InjectModel("vacancy") private vacancyModel : Model<Vacancy>,
        @InjectModel("user") private userModel : Model<User>,
        @InjectModel("resumes") private resumeModel : Model<Resumes>,
        private awsS3Service : AwsS3Service

    ){}

    async getAllVacancy(vacancyFilter : VacancyFilter){
            
            const {name , minSallery , maxSallery , location } = vacancyFilter
            if(!name && !minSallery && !maxSallery && !location )  return await this.vacancyModel.find({status : "approved"}).populate("company")
            const search : FilterQuery<Vacancy> = {
                status : "approved"
            }
            if (name) {
                search.name = name;
              }
            
              if (location) {
                search.location = location;
              }
             
            
              if (minSallery || maxSallery) {
                search.sallery = {};
                if (minSallery) search.sallery.$gte = Number(minSallery);
                if (maxSallery) search.sallery.$lte = Number(maxSallery);
              }
            
              return await this.vacancyModel.find(search).populate("company");
    }

    getVacancy(id : string){
        if(!isValidObjectId(id)) throw new BadRequestException("Invalid id")
            return this.vacancyModel.findById(id).populate("company")
    }

    async addFileInResume(vacancyId : string , file : Express.Multer.File , userId : string){
        if(!isValidObjectId(vacancyId)) throw new BadRequestException("invalid id")
        if(!file) return false

        const fileType = file.mimetype.split('/')[1]
        if(fileType !== 'pdf') throw new BadRequestException("Only pdf type files")
        const fileId = `application/${uuidv4()}.${fileType}`
        await this.awsS3Service.uploadPdf(fileId , file)
        await this.resumeModel.create({fileId , user : userId})

        const vacancy = await this.vacancyModel.findByIdAndUpdate(vacancyId , {$push : {resumes : {fileId , user : userId} }} , {new : true})
        const putApplieInUser = await this.userModel.findByIdAndUpdate(userId ,{$push : {applies : vacancyId}} )
        return {message : "resume added succesfully" , vacancy , putApplieInUser}
    }


    async getFile(fileId : string){
        return this.awsS3Service.getFileById(fileId)
    }
    async deleteFile(fileId : string){
        return this.awsS3Service.deleteFileById(fileId)
    }
}
