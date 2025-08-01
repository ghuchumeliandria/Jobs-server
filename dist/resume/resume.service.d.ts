import { Resumes } from './schema/resume.schema';
import { Model } from 'mongoose';
export declare class ResumeService {
    private resumeModel;
    constructor(resumeModel: Model<Resumes>);
    getResume(id: string): Promise<(import("mongoose").Document<unknown, {}, Resumes, {}> & Resumes & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
