import { AdminService } from './admin.service';
import { companyApproval } from 'src/companies/dto/companyApproval.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllCompanies(status: companyApproval): Promise<(import("mongoose").Document<unknown, {}, import("../companies/schema/company.schema").Company, {}> & import("../companies/schema/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[] | undefined>;
    getCompany(id: string): Promise<import("mongoose").Document<unknown, {}, import("../companies/schema/company.schema").Company, {}> & import("../companies/schema/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getVacancies(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../companies/schema/company.schema").Vacancy, {}> & import("../companies/schema/company.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../companies/schema/company.schema").Vacancy, {}> & import("../companies/schema/company.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../companies/schema/company.schema").Vacancy, "find", {}>;
    getVacancy(id: string): Promise<import("mongoose").Document<unknown, {}, import("../companies/schema/company.schema").Vacancy, {}> & import("../companies/schema/company.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getUsers(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../users/schema/users.schema").User, {}> & import("../users/schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("../users/schema/users.schema").User, {}> & import("../users/schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../users/schema/users.schema").User, "find", {}>;
    companyApproval(companyId: string, status: companyApproval): Promise<{
        message: string;
        company: import("mongoose").Document<unknown, {}, import("../companies/schema/company.schema").Company, {}> & import("../companies/schema/company.schema").Company & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    vacancyApproval(vacancyId: string, status: companyApproval): Promise<{
        message: string;
        vacancy: import("mongoose").Document<unknown, {}, import("../companies/schema/company.schema").Vacancy, {}> & import("../companies/schema/company.schema").Vacancy & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
}
