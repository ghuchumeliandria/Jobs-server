import { ResumeService } from './resume.service';
export declare class ResumeController {
    private readonly resumeService;
    constructor(resumeService: ResumeService);
    getResume(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schema/resume.schema").Resumes, {}> & import("./schema/resume.schema").Resumes & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
