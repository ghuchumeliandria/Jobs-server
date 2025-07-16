import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddVacancy {
    @IsNotEmpty()
    @IsString()
    name : string

    @IsNotEmpty()
    @IsNumber()
    sallery : number   

    @IsNotEmpty()
    @IsString()
    description : string

    @IsNotEmpty()
    @IsString()
    location : string
}