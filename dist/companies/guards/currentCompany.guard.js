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
exports.CurrentCompany = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CurrentCompany = class CurrentCompany {
    companyModel;
    vacancyModel;
    constructor(companyModel, vacancyModel) {
        this.companyModel = companyModel;
        this.vacancyModel = vacancyModel;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const { id: vacanyId } = req.params;
        if (!(0, mongoose_2.isValidObjectId)(vacanyId) || !(0, mongoose_2.isValidObjectId)(req.userId))
            throw new common_1.BadRequestException("invalid id");
        const vacancy = await this.vacancyModel.findById(vacanyId);
        if (!vacancy)
            throw new common_1.BadRequestException("vacancy not found");
        const company = await this.companyModel.findById(req.userId);
        if (!company)
            throw new common_1.BadRequestException("company not found");
        const isVacanyOfCopmany = company.vacansies.some(id => (id.toString() === vacanyId));
        if (!isVacanyOfCopmany)
            throw new common_1.BadRequestException("You don't have permision , because you are not owner of vacancy");
        return true;
    }
};
exports.CurrentCompany = CurrentCompany;
exports.CurrentCompany = CurrentCompany = __decorate([
    __param(0, (0, mongoose_1.InjectModel)("company")),
    __param(1, (0, mongoose_1.InjectModel)("vacancy")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CurrentCompany);
//# sourceMappingURL=currentCompany.guard.js.map