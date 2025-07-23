import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IncomingHttpHeaders } from "http";
import { Observable } from "rxjs";
export declare class IsCompany implements CanActivate {
    private jwtservice;
    constructor(jwtservice: JwtService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    getTokenFromHeaders(headers: IncomingHttpHeaders): string | null;
}
