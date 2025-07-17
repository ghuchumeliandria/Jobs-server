import { BadRequestException, CanActivate, ExecutionContext } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model } from "mongoose";
import { Observable } from "rxjs";
import { Company, Vacancy } from "../schema/company.schema";

export class CurrentCompany implements CanActivate{
    constructor(
        @InjectModel("company") private companyModel : Model<Company>,
        @InjectModel("vacancy") private vacancyModel : Model<Vacancy>
    ){}
   async canActivate(context: ExecutionContext):Promise<boolean>  {
        const req = context.switchToHttp().getRequest()
        const {id : vacanyId} = req.params
        if(!isValidObjectId(vacanyId) || !isValidObjectId(req.userId)) throw new BadRequestException("invalid id")

        const vacancy = await this.vacancyModel.findById(vacanyId)
        if(!vacancy) throw new BadRequestException("vacancy not found")

        const company = await this.companyModel.findById(req.userId)
        if(!company) throw new BadRequestException("company not found")

        const isVacanyOfCopmany = company.vacansies.some(id => (
            id.toString() === vacanyId
        ))

        if(!isVacanyOfCopmany) throw new BadRequestException("You don't have permision , because you are not owner of vacancy")
    
        return true
        
    }
}