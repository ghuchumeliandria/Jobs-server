import { IsEnum,  IsIn,  IsOptional,  IsString } from "class-validator";
import { StatusEnum } from "src/enums/enum";

export class companyApproval {
    @IsString()
    @IsOptional()
    @IsIn(['approved' , 'rejected'  ] )
    status : 'approved' | 'rejected' 
}

