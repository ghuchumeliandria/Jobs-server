import { VanaciesService } from './vacancies.service';
import { VacancyFilter } from './dto/vacancyFilter.dto';
export declare class VanaciesController {
    private readonly vanaciesService;
    constructor(vanaciesService: VanaciesService);
    getAllVacancy(filterFields: VacancyFilter): Promise<(import("mongoose").Document<unknown, {}, import("../companies/schema/company.schema").Vacancy, {}> & import("../companies/schema/company.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getVacancy(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../companies/schema/company.schema").Vacancy, {}> & import("../companies/schema/company.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../companies/schema/company.schema").Vacancy, {}> & import("../companies/schema/company.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../companies/schema/company.schema").Vacancy, "findOne", {}>;
    uploadFile(vacancyId: string, userId: string, file: Express.Multer.File): Promise<false | {
        message: string;
        vacancy: (import("mongoose").Document<unknown, {}, import("../companies/schema/company.schema").Vacancy, {}> & import("../companies/schema/company.schema").Vacancy & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
        putApplieInUser: (import("mongoose").Document<unknown, {}, import("../users/schema/users.schema").User, {}> & import("../users/schema/users.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    getFile(fileId: string): Promise<string | undefined>;
    deleteFile(fileId: string): Promise<string>;
}
