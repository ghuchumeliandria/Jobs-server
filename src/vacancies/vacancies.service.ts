import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { companyApproval } from 'src/companies/dto/companyApproval.dto';
import { Vacancy } from 'src/companies/schema/company.schema';
import { VacancyFilter } from './dto/vacancyFilter.dto';

@Injectable()
export class VanaciesService {

    constructor(
        @InjectModel("vacancy") private vacancyModel : Model<Vacancy>
    ){}

    async getAllVacancy(vacancyFilter : VacancyFilter){
            
            const {name , minSallery , maxSallery , location} = vacancyFilter
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
            
              return await this.vacancyModel.find(search);
    }

}
