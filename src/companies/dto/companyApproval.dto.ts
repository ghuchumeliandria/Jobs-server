import { IsEnum,  IsString } from "class-validator";
import { StatusEnum } from "src/enums/enum";

export class companyApproval {
    @IsString()
    @IsEnum(StatusEnum , {message : 'status must be approved , rejected or pending'})
    status : StatusEnum
}

