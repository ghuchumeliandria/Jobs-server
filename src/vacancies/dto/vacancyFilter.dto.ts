import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class VacancyFilter {
    @IsOptional()
    @IsString()
    name : string
    @IsOptional()
    @IsNumberString()
    minSallery : number
    @IsOptional()
    @IsNumberString()
    maxSallery : number
    @IsOptional()
    @IsString()
    location : string
}