import { JwtService } from "@nestjs/jwt";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
export declare class IsAuthGuard implements CanActivate {
    private jwtservice;
    constructor(jwtservice: JwtService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    getTokenFromHeaders(headers: any): any;
}
