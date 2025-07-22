import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { companyApproval } from 'src/companies/dto/companyApproval.dto';
import { Company, Vacancy } from 'src/companies/schema/company.schema';
import { User } from 'src/users/schema/users.schema';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel('company') private companyModel : Model<Company>,
        @InjectModel('vacancy') private vacancyModel : Model<Vacancy>,
        @InjectModel('user') private userModel : Model<User>
    ){}

    async getAllCompanies({status} : companyApproval){
        
        if(!status ) return await this.companyModel.find()
        if(status) {
            return await this.companyModel.find({status})
        }
           
    }

    async getUsers(){
        return await this.userModel.find()
    }

    async getCompany(id : string){
        if(!isValidObjectId(id)) throw new BadRequestException("invalid id")

        const company = await this.companyModel.findById(id)
        if(!company) throw new BadRequestException("Company not found")
        
        return company

    }

    async companyApproval({status} : companyApproval, companyId : string){
        if(!isValidObjectId(companyId)) throw new BadRequestException("Invalid id")

        if(!status) throw new BadRequestException("invalid status")

        const company = await this.companyModel.findByIdAndUpdate(companyId, {status} , {new : true})

        if(!company) throw new BadRequestException("Company not found")

        const message = status === "approved" ? "Company has been approved" : "Company has been rejected"

        return {message  , company}
    }

    async vacancyApproval({status} : companyApproval, vacancyId : string){
        if(!isValidObjectId(vacancyId)) throw new BadRequestException("Invalid id")
            
        const vacancy = await this.vacancyModel.findByIdAndUpdate(vacancyId, {status} , {new : true})

        if(!vacancy) throw new BadRequestException("vacancy not found")

        const message = status === "approved" ? "Vacancy has been approved" : "Vacancy has been rejected"

        return {message  , vacancy}
    }
}
