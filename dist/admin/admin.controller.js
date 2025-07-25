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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const isAuth_guard_1 = require("../auth/guards/isAuth.guard");
const isAdmin_guard_1 = require("./guards/isAdmin.guard");
const companyApproval_dto_1 = require("../companies/dto/companyApproval.dto");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    getAllCompanies(status) {
        return this.adminService.getAllCompanies(status);
    }
    getCompany(id) {
        return this.adminService.getCompany(id);
    }
    getVacancies() {
        return this.adminService.getVacancies();
    }
    getVacancy(id) {
        return this.adminService.getVacancy(id);
    }
    getUsers() {
        return this.adminService.getUsers();
    }
    companyApproval(companyId, status) {
        return this.adminService.companyApproval(status, companyId);
    }
    vacancyApproval(vacancyId, status) {
        return this.adminService.vacancyApproval(status, vacancyId);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('companies'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [companyApproval_dto_1.companyApproval]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAllCompanies", null);
__decorate([
    (0, common_1.Get)('company/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getCompany", null);
__decorate([
    (0, common_1.Get)("vacancies"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getVacancies", null);
__decorate([
    (0, common_1.Get)('vacancy/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getVacancy", null);
__decorate([
    (0, common_1.Get)("users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Patch)('company-approval/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, companyApproval_dto_1.companyApproval]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "companyApproval", null);
__decorate([
    (0, common_1.Patch)('vacancy-approval/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, companyApproval_dto_1.companyApproval]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "vacancyApproval", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuthGuard, isAdmin_guard_1.IsAdmin),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map