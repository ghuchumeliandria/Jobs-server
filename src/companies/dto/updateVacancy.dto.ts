
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateVacancy {
    @IsOptional()
    @IsString()
    name : string

    @IsOptional()
    @IsNumber()
    sallery : number   

    @IsOptional()
    @IsString()
    description : string

    @IsOptional()
    @IsString()
    location : string
}