import mongoose from "mongoose";
export declare class Company {
    fullName: string;
    email: string;
    password: string;
    description: string;
    status: 'pending' | 'approved' | 'rejected';
    role: string;
    avatar: string;
    vacansies: mongoose.Schema.Types.ObjectId[];
}
export declare class Vacancy {
    name: string;
    sallery: number;
    description: string;
    location: string;
    status: 'pending' | 'approved' | 'rejected';
    company: mongoose.Schema.Types.ObjectId;
    resumes: {
        fileId: string;
        user: mongoose.Schema.Types.ObjectId;
    }[];
}
export declare const companySchema: mongoose.Schema<Company, mongoose.Model<Company, any, any, any, mongoose.Document<unknown, any, Company, any> & Company & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Company, mongoose.Document<unknown, {}, mongoose.FlatRecord<Company>, {}> & mongoose.FlatRecord<Company> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const vacancySchema: mongoose.Schema<Vacancy, mongoose.Model<Vacancy, any, any, any, mongoose.Document<unknown, any, Vacancy, any> & Vacancy & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Vacancy, mongoose.Document<unknown, {}, mongoose.FlatRecord<Vacancy>, {}> & mongoose.FlatRecord<Vacancy> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
