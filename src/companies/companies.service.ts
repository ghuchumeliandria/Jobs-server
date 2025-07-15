import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Company, Vacancy } from './schema/company.schema';
import { AddVacancy } from './dto/addVacancy.dto';
@Injectable()
export class CompaniesService {
  
  constructor(
    @InjectModel('company') private companyModel : Model<Company>,
    @InjectModel('vacancy') private vacancyModel : Model<Vacancy>,
  ){}

 async companyProfile(id: number) {
  console.log(id)
    return await this.companyModel.findById(id)
  }

  async addVacancy(companyId : number , {name, sallery , description} : AddVacancy){
    if(!name || !sallery  || !description) throw new BadRequestException("fields are required")
      if(!isValidObjectId(companyId)) throw new BadRequestException("invalid id")

      const newVanacy = await this.vacancyModel.create({name , sallery , description , company : companyId})

      await this.companyModel.findByIdAndUpdate(companyId , {$push :{ vacansies : newVanacy.id}})

      return {message : 'vacancy successfully added , now you should wait for the admin until he approves your vacancy' , addedVacancy : newVanacy}
  }
}
