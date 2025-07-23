import { Model } from 'mongoose';
import { Vacancy } from 'src/companies/schema/company.schema';
import { VacancyFilter } from './dto/vacancyFilter.dto';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
export declare class VanaciesService {
    private vacancyModel;
    private awsS3Service;
    constructor(vacancyModel: Model<Vacancy>, awsS3Service: AwsS3Service);
    getAllVacancy(vacancyFilter: VacancyFilter): Promise<(import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    addFileInResume(vacancyId: string, file: Express.Multer.File, userId: string): Promise<false | {
        message: string;
        vacancy: (import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
    }>;
    getFile(fileId: string): Promise<string | undefined>;
    deleteFile(fileId: string): Promise<string>;
}
