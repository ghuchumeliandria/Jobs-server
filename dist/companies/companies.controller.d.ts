import { CompaniesService } from './companies.service';
import { AddVacancy } from './dto/addVacancy.dto';
import { UpdateVacancy } from './dto/updateVacancy.dto';
import { Status } from 'src/dto/status.dto';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    getAllCompanies(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/company.schema").Company, {}> & import("./schema/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./schema/company.schema").Company, {}> & import("./schema/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./schema/company.schema").Company, "find", {}>;
    getCompanyProfileForGuest(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/company.schema").Company, {}> & import("./schema/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./schema/company.schema").Company, {}> & import("./schema/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./schema/company.schema").Company, "findOne", {}>;
    companyProfile(id: string): string;
    addVacancy(addVacany: AddVacancy, companyId: string): Promise<{
        message: string;
        addedVacancy: import("mongoose").Document<unknown, {}, import("./schema/company.schema").Vacancy, {}> & import("./schema/company.schema").Vacancy & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    vacancyDelete(vacancyId: string, companyId: string): Promise<{
        message: string;
        deletedVacancy: (import("mongoose").Document<unknown, {}, import("./schema/company.schema").Vacancy, {}> & import("./schema/company.schema").Vacancy & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    vacancyUpdate(vacancyId: string, updateVacancy: UpdateVacancy): Promise<{
        message: string;
        vacancy: (import("mongoose").Document<unknown, {}, import("./schema/company.schema").Vacancy, {}> & import("./schema/company.schema").Vacancy & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    pendingVacancies(companyId: string, status: Status): Promise<import("mongoose").Schema.Types.ObjectId[] | (import("mongoose").Document<unknown, {}, import("./schema/company.schema").Company, {}> & import("./schema/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null | undefined>;
}
