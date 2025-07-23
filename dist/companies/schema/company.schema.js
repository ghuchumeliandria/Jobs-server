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
Object.defineProperty(exports, "__esModule", { value: true });
exports.vacancySchema = exports.companySchema = exports.Vacancy = exports.Company = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Company = class Company {
    fullName;
    email;
    password;
    description;
    status;
    role;
    avatar;
    vacansies;
};
exports.Company = Company;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true
    }),
    __metadata("design:type", String)
], Company.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true
    }),
    __metadata("design:type", String)
], Company.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        select: false
    }),
    __metadata("design:type", String)
], Company.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true
    }),
    __metadata("design:type", String)
], Company.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: false,
        default: 'pending'
    }),
    __metadata("design:type", String)
], Company.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        default: "USER"
    }),
    __metadata("design:type", String)
], Company.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: false,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }),
    __metadata("design:type", String)
], Company.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.default.Schema.Types.ObjectId],
        ref: 'vacancy',
        default: []
    }),
    __metadata("design:type", Array)
], Company.prototype, "vacansies", void 0);
exports.Company = Company = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Company);
let Vacancy = class Vacancy {
    name;
    sallery;
    description;
    location;
    status;
    company;
    resumes;
};
exports.Vacancy = Vacancy;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true
    }),
    __metadata("design:type", String)
], Vacancy.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true
    }),
    __metadata("design:type", Number)
], Vacancy.prototype, "sallery", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true
    }),
    __metadata("design:type", String)
], Vacancy.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Vacancy.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: false,
        default: 'pending'
    }),
    __metadata("design:type", String)
], Vacancy.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'company',
        required: false,
    }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Vacancy.prototype, "company", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                fileId: String,
                user: { type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }
            }],
        default: []
    }),
    __metadata("design:type", Array)
], Vacancy.prototype, "resumes", void 0);
exports.Vacancy = Vacancy = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Vacancy);
exports.companySchema = mongoose_1.SchemaFactory.createForClass(Company);
exports.vacancySchema = mongoose_1.SchemaFactory.createForClass(Vacancy);
//# sourceMappingURL=company.schema.js.map