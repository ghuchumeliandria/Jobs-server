import { IsEmail, IsOptional, IsString } from "class-validator";


export class signInDto {
    

    @IsEmail()
    @IsOptional()
    email : string

    @IsString()
    @IsOptional()
    password : string

}