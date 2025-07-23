import { Model } from 'mongoose';
import { User } from 'src/users/schema/users.schema';
import { signUpDto } from './dto/signUp.dto';
import { signInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { Company } from 'src/companies/schema/company.schema';
export declare class AuthService {
    private userModel;
    private companyModel;
    private jwtservice;
    constructor(userModel: Model<User>, companyModel: Model<Company>, jwtservice: JwtService);
    signUp({ fullName, email, password, role, confirmPassword, description }: signUpDto): Promise<{
        message: string;
        data: {
            fullName: string;
            email: string;
            role: string;
            id: import("mongoose").Types.ObjectId;
            description?: undefined;
        };
    } | {
        message: string;
        data: {
            fullName: string;
            email: string;
            role: string;
            description: string;
            id: import("mongoose").Types.ObjectId;
        };
    } | undefined>;
    signIn({ email, password }: signInDto): Promise<{
        token: string;
    }>;
    getCurrentUserOrCompany(id: string): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | (import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | undefined>;
}
