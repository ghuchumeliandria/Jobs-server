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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CompaniesService = class CompaniesService {
    companyModel;
    vacancyModel;
    constructor(companyModel, vacancyModel) {
        this.companyModel = companyModel;
        this.vacancyModel = vacancyModel;
    }
    getAllCompany() {
        return this.companyModel.find({ status: "approved" });
    }
    getCompanyProfileForGuest(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("invalid id");
        return this.companyModel.findById(id).populate("vacansies");
    }
    companyProfile(id) {
        console.log(id);
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("invalid id");
        return id;
    }
    async addVacancy(companyId, { name, sallery, description, location }) {
        if (!name || !sallery || !description || !location)
            throw new common_1.BadRequestException("fields are required");
        if (!(0, mongoose_2.isValidObjectId)(companyId))
            throw new common_1.BadRequestException("invalid id");
        const newVanacy = await this.vacancyModel.create({ name, sallery, description, location, company: companyId });
        await this.companyModel.findByIdAndUpdate(companyId, { $push: { vacansies: newVanacy.id } });
        return { message: 'vacancy successfully added , now you should wait for the admin until he approves your vacancy', addedVacancy: newVanacy };
    }
    async deleteVacancy(vacancyId, companyId) {
        await this.companyModel.updateOne({ _id: companyId }, { $pull: { vacansies: vacancyId } });
        const deletedVacancy = await this.vacancyModel.findByIdAndDelete(vacancyId);
        return { message: "vacancy deleted succesfully", deletedVacancy };
    }
    async vacancyUpdate(vacancyId, { name, description, sallery, location }) {
        if (!name && !description && !sallery && !location)
            throw new common_1.BadRequestException("You are not allowed to update the vacancy without specifying the changes to be made");
        const vacancy = await this.vacancyModel.findByIdAndUpdate(vacancyId, { name, description, sallery, location }, { new: true });
        return { message: "vacancy successfully updated", vacancy };
    }
    async companyVacancies(companyId, { status }) {
        if (!(0, mongoose_2.isValidObjectId)(companyId))
            throw new common_1.BadRequestException("invalid id");
        const company = await this.companyModel.findById(companyId).populate("vacansies");
        if (!company)
            throw new common_1.BadRequestException("company not found");
        if (!status)
            return company.vacansies;
        if (status) {
            const company = await this.companyModel.findById(companyId).populate({
                path: "vacansies",
                match: { status }
            }).select('vacansies');
            return company;
        }
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('company')),
    __param(1, (0, mongoose_1.InjectModel)('vacancy')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map