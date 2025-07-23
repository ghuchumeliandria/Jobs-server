import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Model } from "mongoose";
import { Company, Vacancy } from "../schema/company.schema";
export declare class CurrentCompany implements CanActivate {
    private companyModel;
    private vacancyModel;
    constructor(companyModel: Model<Company>, vacancyModel: Model<Vacancy>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
