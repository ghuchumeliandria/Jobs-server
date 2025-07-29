import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from 'src/users/schema/users.schema';
import { signUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { signInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { Company } from 'src/companies/schema/company.schema';
@Injectable()
export class AuthService {
    constructor(@InjectModel('user') private userModel : Model<User>,
    @InjectModel('company') private companyModel : Model<Company>,
    private jwtservice : JwtService){}


    async signUp({fullName , email , password , role , confirmPassword , description } : signUpDto){
        if(!fullName || !email || !password || !role || !confirmPassword) throw new BadRequestException("fields are required")
            const existUser = await this.userModel.findOne({email})
            const exitCompany = await this.companyModel.findOne({email})

            if(existUser || exitCompany) throw new BadRequestException("email already used")


        if(role === 'USER'){
                
                if(confirmPassword !== password) throw new BadRequestException("confirm password is incorrect")
                    
                    const hashedPass = await bcrypt.hash(password , 10)
                    
                    const newUser = await this.userModel.create({
                        fullName,
                        email,
                        password : hashedPass,
                        role
                    })
                    
                    return {message : 'User created successfully' , data : {
                        fullName,
                        email,
                        role,
                        id : newUser._id
                    }}
        }

        if(role === "COMPANY"){
                
                if(confirmPassword !== password) throw new BadRequestException("confirm password is incorrect")
                    
                    const hashedPass = await bcrypt.hash(password , 10)
                    
                    const newUser = await this.companyModel.create({
                        fullName,
                        email,
                        password : hashedPass,
                        role,
                        description
                    })
                    
                    return {message : 'Company created successfull , now you should wait admin to approved your request' , data : {
                        fullName,
                        email,
                        role,
                        description,
                        id : newUser._id
                    }}
        }
    }

    async signIn({email , password} : signInDto){
        if(!email || !password) throw new BadRequestException("fields are requiured")
        
        let existUser = await this.userModel.findOne({email}).select("+password")

        if(!existUser) {
            existUser = await this.companyModel.findOne({email}).select("+password")
        }

        if(!existUser) throw new BadRequestException("Invalid Credentials")
        
        const isPassEqual = await bcrypt.compare(password , existUser.password)

        if(!isPassEqual) throw new BadRequestException("invalid credentials")

        const payload = {id : existUser._id , role : existUser.role}

        const token =  this.jwtservice.sign(payload , {expiresIn : '2h'})

        return {token}
    }


    async getCurrentUserOrCompany(id : string){
        if(!isValidObjectId(id)) throw new BadRequestException("invalid id")
         const user = await this.userModel
        .findById(id)
        .populate({
          path: 'applies',
          populate: {
            path: 'company', 
            model: 'company',
          },
        });
        const company = await this.companyModel.findById(id)
        if(company) return company
        if(user) return user
    }
}
