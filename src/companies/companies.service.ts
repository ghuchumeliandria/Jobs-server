import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Company, Vacancy } from './schema/company.schema';
import { AddVacancy } from './dto/addVacancy.dto';
import { UpdateVacancy } from './dto/updateVacancy.dto';
import { companyApproval } from './dto/companyApproval.dto';
import { Status } from 'src/dto/status.dto';
@Injectable()
export class CompaniesService {
  
  constructor(
    @InjectModel('company') private companyModel : Model<Company>,
    @InjectModel('vacancy') private vacancyModel : Model<Vacancy>,
  ){}

   getAllCompany(){
    return this.companyModel.find({status: "approved"})
  }

  companyProfile(id: string) {
    console.log(id)
    if(!isValidObjectId(id)) throw new BadRequestException("invalid id")
    return  id
  }

  async addVacancy(companyId : string , {name, sallery , description , location} : AddVacancy){
    if(!name || !sallery  || !description || !location) throw new BadRequestException("fields are required")
      if(!isValidObjectId(companyId)) throw new BadRequestException("invalid id")

      const newVanacy = await this.vacancyModel.create({name , sallery , description , location ,  company : companyId})

      await this.companyModel.findByIdAndUpdate(companyId , {$push :{ vacansies : newVanacy.id}})

      return {message : 'vacancy successfully added , now you should wait for the admin until he approves your vacancy' , addedVacancy : newVanacy}
  }

  async deleteVacancy(vacancyId : string , companyId : string){  
          await this.companyModel.updateOne({_id : companyId} , { $pull : {vacansies : vacancyId}  }) 
          const deletedVacancy =  await this.vacancyModel.findByIdAndDelete(vacancyId)
      
      return {message : "vacancy deleted succesfully" , deletedVacancy}
  }

  async vacancyUpdate(vacancyId : string , {name , description , sallery , location} : UpdateVacancy){

    if(!name && !description && !sallery && !location) throw new BadRequestException("You are not allowed to update the vacancy without specifying the changes to be made")

    const vacancy = await this.vacancyModel.findByIdAndUpdate(vacancyId ,{name , description , sallery , location} , {new : true})

    return{ message : "vacancy successfully updated" , vacancy}
  }

  async companyVacancies(companyId : string , {status} : Status){
    if(!isValidObjectId(companyId)) throw new BadRequestException("invalid id")

    const company =  await  this.companyModel.findById(companyId).populate("vacansies")
    if(!company) throw new BadRequestException("company not found")

      if(!status) return company.vacansies

      if(status) {
       const company = await this.companyModel.findById(companyId).populate({
        path : "vacansies",
        match : {status }
       }).select('vacansies')
        return company
      } 

    
  }

}
