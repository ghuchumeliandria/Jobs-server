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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AdminService = class AdminService {
    companyModel;
    vacancyModel;
    userModel;
    constructor(companyModel, vacancyModel, userModel) {
        this.companyModel = companyModel;
        this.vacancyModel = vacancyModel;
        this.userModel = userModel;
    }
    async getAllCompanies({ status }) {
        if (!status)
            return await this.companyModel.find();
        if (status) {
            return await this.companyModel.find({ status });
        }
    }
    async getUsers() {
        return await this.userModel.find();
    }
    async getCompany(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("invalid id");
        const company = await this.companyModel.findById(id);
        if (!company)
            throw new common_1.BadRequestException("Company not found");
        return company;
    }
    async companyApproval({ status }, companyId) {
        if (!(0, mongoose_2.isValidObjectId)(companyId))
            throw new common_1.BadRequestException("Invalid id");
        if (!status)
            throw new common_1.BadRequestException("invalid status");
        const company = await this.companyModel.findByIdAndUpdate(companyId, { status }, { new: true });
        if (!company)
            throw new common_1.BadRequestException("Company not found");
        const message = status === "approved" ? "Company has been approved" : "Company has been rejected";
        return { message, company };
    }
    async vacancyApproval({ status }, vacancyId) {
        if (!(0, mongoose_2.isValidObjectId)(vacancyId))
            throw new common_1.BadRequestException("Invalid id");
        const vacancy = await this.vacancyModel.findByIdAndUpdate(vacancyId, { status }, { new: true });
        if (!vacancy)
            throw new common_1.BadRequestException("vacancy not found");
        const message = status === "approved" ? "Vacancy has been approved" : "Vacancy has been rejected";
        return { message, vacancy };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('company')),
    __param(1, (0, mongoose_1.InjectModel)('vacancy')),
    __param(2, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], AdminService);
//# sourceMappingURL=admin.service.js.map