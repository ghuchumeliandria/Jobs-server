"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsApproved = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let IsApproved = class IsApproved {
    companyModel;
    jwtservice;
    constructor(companyModel, jwtservice) {
        this.companyModel = companyModel;
        this.jwtservice = jwtservice;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const token = this.getTokenFromHeaders(req.headers);
        if (!token)
            throw new common_1.BadRequestException("token expired");
        const payload = this.jwtservice.verify(token, { secret: process.env.JWT_SECRET });
        const id = payload.id;
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("invalid id");
        const company = await this.companyModel.findById(id);
        if (!company)
            throw new common_1.BadRequestException("company not found");
        if (company?.status === "pending")
            throw new common_1.BadRequestException("you don't have a permision until admin approved your status");
        return true;
    }
    getTokenFromHeaders(headers) {
        const authorization = headers["authorization"];
        if (!authorization)
            return false;
        const [type, token] = authorization.split(" ");
        return type === "Bearer" ? token : null;
    }
};
exports.IsApproved = IsApproved;
exports.IsApproved = IsApproved = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("company")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], IsApproved);
//# sourceMappingURL=isApproved.guard.js.map