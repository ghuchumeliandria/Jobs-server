import { Model } from 'mongoose';
import { Vacancy } from 'src/companies/schema/company.schema';
import { VacancyFilter } from './dto/vacancyFilter.dto';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { User } from 'src/users/schema/users.schema';
import { Resumes } from 'src/resume/schema/resume.schema';
export declare class VanaciesService {
    private vacancyModel;
    private userModel;
    private resumeModel;
    private awsS3Service;
    constructor(vacancyModel: Model<Vacancy>, userModel: Model<User>, resumeModel: Model<Resumes>, awsS3Service: AwsS3Service);
    getAllVacancy(vacancyFilter: VacancyFilter): Promise<(import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getVacancy(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Vacancy, "findOne", {}>;
    addFileInResume(vacancyId: string, file: Express.Multer.File, userId: string): Promise<false | {
        message: string;
        vacancy: (import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
        putApplieInUser: (import("mongoose").Document<unknown, {}, User, {}> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    getFile(fileId: string): Promise<string | undefined>;
    deleteFile(fileId: string): Promise<string>;
}
