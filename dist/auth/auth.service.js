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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userModel;
    companyModel;
    jwtservice;
    constructor(userModel, companyModel, jwtservice) {
        this.userModel = userModel;
        this.companyModel = companyModel;
        this.jwtservice = jwtservice;
    }
    async signUp({ fullName, email, password, role, confirmPassword, description }) {
        if (!fullName || !email || !password || !role || !confirmPassword)
            throw new common_1.BadRequestException("fields are required");
        const existUser = await this.userModel.findOne({ email });
        const exitCompany = await this.companyModel.findOne({ email });
        if (existUser || exitCompany)
            throw new common_1.BadRequestException("email already used");
        if (role === 'USER') {
            if (confirmPassword !== password)
                throw new common_1.BadRequestException("confirm password is incorrect");
            const hashedPass = await bcrypt.hash(password, 10);
            const newUser = await this.userModel.create({
                fullName,
                email,
                password: hashedPass,
                role
            });
            return { message: 'User created successfully', data: {
                    fullName,
                    email,
                    role,
                    id: newUser._id
                } };
        }
        if (role === "COMPANY") {
            if (confirmPassword !== password)
                throw new common_1.BadRequestException("confirm password is incorrect");
            const hashedPass = await bcrypt.hash(password, 10);
            const newUser = await this.companyModel.create({
                fullName,
                email,
                password: hashedPass,
                role,
                description
            });
            return { message: 'Company created successfull , now you should wait admin to approved your request', data: {
                    fullName,
                    email,
                    role,
                    description,
                    id: newUser._id
                } };
        }
    }
    async signIn({ email, password }) {
        if (!email || !password)
            throw new common_1.BadRequestException("fields are requiured");
        let existUser = await this.userModel.findOne({ email }).select("+password");
        if (!existUser) {
            existUser = await this.companyModel.findOne({ email }).select("+password");
        }
        if (!existUser)
            throw new common_1.BadRequestException("Invalid Credentials");
        const isPassEqual = await bcrypt.compare(password, existUser.password);
        if (!isPassEqual)
            throw new common_1.BadRequestException("invalid credentials");
        const payload = { id: existUser._id, role: existUser.role };
        const token = this.jwtservice.sign(payload, { expiresIn: '2h' });
        return { token };
    }
    async getCurrentUserOrCompany(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException("invalid id");
        const user = await this.userModel
            .findById(id)
            .populate({
            path: 'applies',
            populate: {
                path: 'company',
                model: 'company',
            },
        });
        const company = await this.companyModel.findById(id).populate({
            path: 'vacansies',
            populate: {
                path: 'resumes',
                model: 'resumes'
            }
        });
        if (company)
            return company;
        if (user)
            return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __param(1, (0, mongoose_1.InjectModel)('company')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map