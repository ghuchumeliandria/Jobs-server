import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { Company } from "../schema/company.schema";
import { IncomingHttpHeaders } from "http";
export declare class IsApproved implements CanActivate {
    private companyModel;
    private jwtservice;
    constructor(companyModel: Model<Company>, jwtservice: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    getTokenFromHeaders(headers: IncomingHttpHeaders): string | false | null;
}
