import { IsEmail, IsOptional, IsString } from "class-validator";


export class signUpDto {
    @IsString()
    @IsOptional()
    fullName: string

    @IsEmail()
    @IsOptional()
    email : string

    @IsString()
    @IsOptional()
    password : string

    @IsString()
    @IsOptional()
    confirmPassword : string

    @IsOptional()
    @IsString()
    description : string

    @IsOptional()
    @IsString()
    role : string
}