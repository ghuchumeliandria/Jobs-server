import { AuthService } from './auth.service';
import { signUpDto } from './dto/signUp.dto';
import { signInDto } from './dto/signIn.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: signUpDto): Promise<{
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
    signIn(signInDto: signInDto): Promise<{
        token: string;
    }>;
    getCurrentUserOrCompany(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../users/schema/users.schema").User, {}> & import("../users/schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | (import("mongoose").Document<unknown, {}, import("../companies/schema/company.schema").Company, {}> & import("../companies/schema/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | undefined>;
}
