import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
@Injectable()
export class IsAdmin implements CanActivate {
    constructor(
        private jwtservice : JwtService
    ){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        const token = this.getTokenFromHeaders(req.headers)

        if(!token) return false
            const payload = this.jwtservice.verify(token , {secret : process.env.JWT_SECRET})
            const role = payload.role
            if( role !== "ADMIN" )  throw new BadRequestException("You don't have a permission")
            return true
         }

        getTokenFromHeaders(headers){
         const authorization = headers["authorization"]

         if(!authorization) return null

         const [type , token] = authorization.split(' ')
        
          return type === "Bearer" ? token : null
        }
}