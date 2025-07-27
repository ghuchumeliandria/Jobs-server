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
exports.VanaciesController = void 0;
const common_1 = require("@nestjs/common");
const vacancies_service_1 = require("./vacancies.service");
const isAuth_guard_1 = require("../auth/guards/isAuth.guard");
const vacancyFilter_dto_1 = require("./dto/vacancyFilter.dto");
const userOrCompanyId_1 = require("../decorators/userOrCompanyId");
const platform_express_1 = require("@nestjs/platform-express");
let VanaciesController = class VanaciesController {
    vanaciesService;
    constructor(vanaciesService) {
        this.vanaciesService = vanaciesService;
    }
    getAllVacancy(filterFields) {
        return this.vanaciesService.getAllVacancy(filterFields);
    }
    getVacancy(id) {
        return this.vanaciesService.getVacancy(id);
    }
    uploadFile(vacancyId, userId, file) {
        return this.vanaciesService.addFileInResume(vacancyId, file, userId);
    }
    getFile(fileId) {
        return this.vanaciesService.getFile(fileId);
    }
    deleteFile(fileId) {
        return this.vanaciesService.deleteFile(fileId);
    }
};
exports.VanaciesController = VanaciesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vacancyFilter_dto_1.VacancyFilter]),
    __metadata("design:returntype", void 0)
], VanaciesController.prototype, "getAllVacancy", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VanaciesController.prototype, "getVacancy", null);
__decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuthGuard),
    (0, common_1.Post)('/:id/apply'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, userOrCompanyId_1.UserId)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], VanaciesController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuthGuard),
    (0, common_1.Post)('get-file'),
    __param(0, (0, common_1.Body)('fileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VanaciesController.prototype, "getFile", null);
__decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuthGuard),
    (0, common_1.Delete)('delete-file'),
    __param(0, (0, common_1.Body)('fileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VanaciesController.prototype, "deleteFile", null);
exports.VanaciesController = VanaciesController = __decorate([
    (0, common_1.Controller)('vacancies'),
    __metadata("design:paramtypes", [vacancies_service_1.VanaciesService])
], VanaciesController);
//# sourceMappingURL=vacancies.controller.js.map