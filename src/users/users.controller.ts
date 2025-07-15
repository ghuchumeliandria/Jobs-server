import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { IsAuthGuard } from 'src/auth/guards/isAuth.guard';
import { IsUser } from './guards/isUserGuard';

@Controller('users')
@UseGuards(IsAuthGuard , IsUser)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(){
    return 'heelo world'
  }
}
