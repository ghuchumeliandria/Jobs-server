import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class signUpDto {
    @IsString()
    @IsNotEmpty()
    fullName: string

    @IsEmail()
    @IsNotEmpty()
    email : string

    @IsString()
    @IsNotEmpty()
    password : string

    @IsString()
    @IsNotEmpty()
    confirmPassword : string

    @IsOptional()
    @IsString()
    description : string

    @IsNotEmpty()
    @IsString()
    role : string
}