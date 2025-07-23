import { Model } from 'mongoose';
import { Company, Vacancy } from './schema/company.schema';
import { AddVacancy } from './dto/addVacancy.dto';
import { UpdateVacancy } from './dto/updateVacancy.dto';
import { Status } from 'src/dto/status.dto';
export declare class CompaniesService {
    private companyModel;
    private vacancyModel;
    constructor(companyModel: Model<Company>, vacancyModel: Model<Vacancy>);
    getAllCompany(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Company, "find", {}>;
    companyProfile(id: string): string;
    addVacancy(companyId: string, { name, sallery, description, location }: AddVacancy): Promise<{
        message: string;
        addedVacancy: import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    deleteVacancy(vacancyId: string, companyId: string): Promise<{
        message: string;
        deletedVacancy: (import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    vacancyUpdate(vacancyId: string, { name, description, sallery, location }: UpdateVacancy): Promise<{
        message: string;
        vacancy: (import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    companyVacancies(companyId: string, { status }: Status): Promise<import("mongoose").Schema.Types.ObjectId[] | (import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null | undefined>;
}
