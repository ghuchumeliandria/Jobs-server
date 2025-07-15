import { IsIn, IsString } from "class-validator";

export class companyApproval {
    @IsString()
    @IsIn([ 'approved' , 'rejected'])
    status : 'approved' | 'rejected'
}

