"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VanaciesModule = void 0;
const common_1 = require("@nestjs/common");
const vacancies_service_1 = require("./vacancies.service");
const vacancies_controller_1 = require("./vacancies.controller");
const mongoose_1 = require("@nestjs/mongoose");
const company_schema_1 = require("../companies/schema/company.schema");
const aws_s3_module_1 = require("../aws-s3/aws-s3.module");
const users_schema_1 = require("../users/schema/users.schema");
let VanaciesModule = class VanaciesModule {
};
exports.VanaciesModule = VanaciesModule;
exports.VanaciesModule = VanaciesModule = __decorate([
    (0, common_1.Module)({
        imports: [aws_s3_module_1.AwsS3Module,
            mongoose_1.MongooseModule.forFeature([
                { schema: company_schema_1.vacancySchema, name: 'vacancy' },
                { schema: users_schema_1.userSchema, name: 'user' }
            ])
        ],
        controllers: [vacancies_controller_1.VanaciesController],
        providers: [vacancies_service_1.VanaciesService],
    })
], VanaciesModule);
//# sourceMappingURL=vacancies.module.js.map