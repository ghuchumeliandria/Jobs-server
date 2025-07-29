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
exports.VanaciesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const aws_s3_service_1 = require("../aws-s3/aws-s3.service");
const uuid_1 = require("uuid");
let VanaciesService = class VanaciesService {
    vacancyModel;
    userModel;
    awsS3Service;
    constructor(vacancyModel, userModel, awsS3Service) {
        this.vacancyModel = vacancyModel;
        this.userModel = userModel;
        this.awsS3Service = awsS3Service;
    }
    async getAllVacancy(vacancyFilter) {
        const { name, minSallery, maxSallery, location } = vacancyFilter;
        if (!name && !minSallery && !maxSallery && !location)
            return await this.vacancyModel.find({ status: "approved" }).populate("company");
        const search = {
            status: "approved"
        };
        if (name) {
            search.name = name;
        }
        if (location) {
            search.location = location;
        }
        if (minSallery || maxSallery) {
            search.sallery = {};
            if (minSallery)
                search.sallery.$gte = Number(minSallery);
            if (maxSallery)
                search.sallery.$lte = Number(maxSallery);
        }
        return await this.vacancyModel.find(search).populate("company");
    }
    getVacancy(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("Invalid id");
        return this.vacancyModel.findById(id).populate("company");
    }
    async addFileInResume(vacancyId, file, userId) {
        if (!(0, mongoose_2.isValidObjectId)(vacancyId))
            throw new common_1.BadRequestException("invalid id");
        if (!file)
            return false;
        const fileType = file.mimetype.split('/')[1];
        if (fileType !== 'pdf')
            throw new common_1.BadRequestException("Only pdf type files");
        const fileId = `application/${(0, uuid_1.v4)()}.${fileType}`;
        await this.awsS3Service.uploadPdf(fileId, file);
        const vacancy = await this.vacancyModel.findByIdAndUpdate(vacancyId, { $push: { resumes: { fileId, user: userId } } }, { new: true });
        const putApplieInUser = await this.userModel.findByIdAndUpdate(userId, { $push: { applies: vacancyId } });
        return { message: "resume added succesfully", vacancy, putApplieInUser };
    }
    async getFile(fileId) {
        return this.awsS3Service.getFileById(fileId);
    }
    async deleteFile(fileId) {
        return this.awsS3Service.deleteFileById(fileId);
    }
};
exports.VanaciesService = VanaciesService;
exports.VanaciesService = VanaciesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("vacancy")),
    __param(1, (0, mongoose_1.InjectModel)("user")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        aws_s3_service_1.AwsS3Service])
], VanaciesService);
//# sourceMappingURL=vacancies.service.js.map