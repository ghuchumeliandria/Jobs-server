import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, isValidObjectId, Model } from 'mongoose';
import { companyApproval } from 'src/companies/dto/companyApproval.dto';
import { Vacancy } from 'src/companies/schema/company.schema';
import { VacancyFilter } from './dto/vacancyFilter.dto';
import { PDF } from './dto/pdf.dto';
import { UserId } from 'src/decorators/userOrCompanyId';

@Injectable()
export class VanaciesService {

    constructor(
        @InjectModel("vacancy") private vacancyModel : Model<Vacancy>
    ){}

    async getAllVacancy(vacancyFilter : VacancyFilter){
            
            const {name , minSallery , maxSallery , location} = vacancyFilter
            if(!name && !minSallery && !maxSallery && !location) return await this.vacancyModel.find({status : "approved"}).populate("company")
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

    async addFileInResume(vacancyId : string , {file} : PDF , userId : string){
        if(!isValidObjectId(vacancyId)) throw new BadRequestException("invalid id")

        if(!file) return false
        const vacancy = await this.vacancyModel.findByIdAndUpdate(vacancyId , {$push : {resumes : {file , user : userId} }} , {new : true})

        return {message : "resume added succesfully" , vacancy}


    }

}
