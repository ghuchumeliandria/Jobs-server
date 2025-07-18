import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CompaniesModule } from './companies/companies.module';
import { AdminModule } from './admin/admin.module';
import { VanaciesModule } from './vacancies/vacancies.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { AwsS3Service } from './aws-s3/aws-s3.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL!),
    AuthModule, UsersModule, CompaniesModule, AdminModule, VanaciesModule, AwsS3Module
  ],
  controllers: [AppController],
  providers: [AppService, AwsS3Service],
})
export class AppModule {}
