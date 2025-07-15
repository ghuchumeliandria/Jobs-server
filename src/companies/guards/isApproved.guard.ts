import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model } from "mongoose";
import { User } from "src/users/schema/users.schema";
import { Company } from "../schema/company.schema";
@Injectable()
export class IsApproved implements CanActivate {
    constructor(
        @InjectModel("company") private companyModel : Model<Company>,
        private jwtservice : JwtService
    ){}
    async canActivate(context: ExecutionContext):  Promise<boolean>  {
        const req = context.switchToHttp().getRequest()
        const token = this.getTokenFromHeaders(req.headers)

        if(!token) throw new BadRequestException("token expired")

        const payload = this.jwtservice.verify(token , {secret : process.env.JWT_SECRET})
        const id = payload.id
        if(!isValidObjectId(id)) throw new BadRequestException("invalid id")

        const company = await this.companyModel.findById(id)
        if(!company) throw new BadRequestException("company not found")
        if(company?.status === "pending") throw new BadRequestException("you don't have a permision until admin approved your status")
            
        return true

    }

    getTokenFromHeaders(headers){
        const authorization = headers["authorization"]
        
        if(!authorization) return false

        const [type,token] = authorization.split(" ")

        return type === "Bearer" ? token : null
    }
}