export declare class Resumes {
    user: string;
    fileId: string;
}
export declare const resumeSchema: import("mongoose").Schema<Resumes, import("mongoose").Model<Resumes, any, any, any, import("mongoose").Document<unknown, any, Resumes, any> & Resumes & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Resumes, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Resumes>, {}> & import("mongoose").FlatRecord<Resumes> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
