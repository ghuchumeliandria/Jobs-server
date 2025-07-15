import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/users/schema/users.schema';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { companySchema } from 'src/companies/schema/company.schema';

@Module({
  imports : [ConfigModule.forRoot({
    isGlobal : true
  }),
  JwtModule.register({
    global : true,
    secret : process.env.JWT_SECRET
  }),
    MongooseModule.forFeature([
      {schema : userSchema , name : 'user'},
      {schema : companySchema , name : 'company'}
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
