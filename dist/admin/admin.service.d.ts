import { Model } from 'mongoose';
import { companyApproval } from 'src/companies/dto/companyApproval.dto';
import { Company, Vacancy } from 'src/companies/schema/company.schema';
import { User } from 'src/users/schema/users.schema';
export declare class AdminService {
    private companyModel;
    private vacancyModel;
    private userModel;
    constructor(companyModel: Model<Company>, vacancyModel: Model<Vacancy>, userModel: Model<User>);
    getAllCompanies({ status }: companyApproval): Promise<(import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[] | undefined>;
    getUsers(): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getCompany(id: string): Promise<import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    companyApproval({ status }: companyApproval, companyId: string): Promise<{
        message: string;
        company: import("mongoose").Document<unknown, {}, Company, {}> & Company & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    vacancyApproval({ status }: companyApproval, vacancyId: string): Promise<{
        message: string;
        vacancy: import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
}
