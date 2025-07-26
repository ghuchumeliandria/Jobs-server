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
exports.CompaniesController = void 0;
const common_1 = require("@nestjs/common");
const companies_service_1 = require("./companies.service");
const isAuth_guard_1 = require("../auth/guards/isAuth.guard");
const isCompany_guard_1 = require("./guards/isCompany.guard");
const userOrCompanyId_1 = require("../decorators/userOrCompanyId");
const isApproved_guard_1 = require("./guards/isApproved.guard");
const addVacancy_dto_1 = require("./dto/addVacancy.dto");
const currentCompany_guard_1 = require("./guards/currentCompany.guard");
const updateVacancy_dto_1 = require("./dto/updateVacancy.dto");
const status_dto_1 = require("../dto/status.dto");
let CompaniesController = class CompaniesController {
    companiesService;
    constructor(companiesService) {
        this.companiesService = companiesService;
    }
    getAllCompanies() {
        return this.companiesService.getAllCompany();
    }
    getCompanyProfileForGuest(id) {
        return this.companiesService.getCompanyProfileForGuest(id);
    }
    companyProfile(id) {
        return this.companiesService.companyProfile(id);
    }
    addVacancy(addVacany, companyId) {
        return this.companiesService.addVacancy(companyId, addVacany);
    }
    vacancyDelete(vacancyId, companyId) {
        return this.companiesService.deleteVacancy(vacancyId, companyId);
    }
    vacancyUpdate(vacancyId, updateVacancy) {
        return this.companiesService.vacancyUpdate(vacancyId, updateVacancy);
    }
    pendingVacancies(companyId, status) {
        return this.companiesService.companyVacancies(companyId, status);
    }
};
exports.CompaniesController = CompaniesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "getAllCompanies", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "getCompanyProfileForGuest", null);
__decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuthGuard, isCompany_guard_1.IsCompany, isApproved_guard_1.IsApproved),
    (0, common_1.Get)("profile/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "companyProfile", null);
__decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuthGuard, isCompany_guard_1.IsCompany, isApproved_guard_1.IsApproved),
    (0, common_1.Post)("add-vacancy"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, userOrCompanyId_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addVacancy_dto_1.AddVacancy, String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "addVacancy", null);
__decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuthGuard, isCompany_guard_1.IsCompany, isApproved_guard_1.IsApproved),
    (0, common_1.UseGuards)(currentCompany_guard_1.CurrentCompany),
    (0, common_1.Delete)('vacancy-delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, userOrCompanyId_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "vacancyDelete", null);
__decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuthGuard, isCompany_guard_1.IsCompany, isApproved_guard_1.IsApproved),
    (0, common_1.UseGuards)(currentCompany_guard_1.CurrentCompany),
    (0, common_1.Patch)('vacancy-update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateVacancy_dto_1.UpdateVacancy]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "vacancyUpdate", null);
__decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuthGuard, isCompany_guard_1.IsCompany, isApproved_guard_1.IsApproved),
    (0, common_1.Get)('vacancies'),
    __param(0, (0, userOrCompanyId_1.UserId)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, status_dto_1.Status]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "pendingVacancies", null);
exports.CompaniesController = CompaniesController = __decorate([
    (0, common_1.Controller)('company'),
    __metadata("design:paramtypes", [companies_service_1.CompaniesService])
], CompaniesController);
//# sourceMappingURL=companies.controller.js.map