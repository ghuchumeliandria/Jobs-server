import { IsIn, IsOptional, IsString } from "class-validator";

export class Status {
    @IsString()
    @IsOptional()
    @IsIn(['approved' , 'rejected'  , 'pending'  ] )
    status : 'approved' | 'rejected' | 'pending'
}