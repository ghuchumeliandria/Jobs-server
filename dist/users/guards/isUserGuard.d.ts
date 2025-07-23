import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
export declare class IsUser implements CanActivate {
    private jwtservice;
    constructor(jwtservice: JwtService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    getTokenFromHeaders(headers: any): any;
}
