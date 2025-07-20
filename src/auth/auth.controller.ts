import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signUp.dto';
import { signInDto } from './dto/signIn.dto';
import { IsAuthGuard } from './guards/isAuth.guard';
import { UserId } from 'src/decorators/userOrCompanyId';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto : signUpDto){
    return this.authService.signUp(signUpDto)
  }

  @Post('sign-in')
  signIn(@Body() signInDto : signInDto){
    return this.authService.signIn(signInDto)
  }
  @UseGuards(IsAuthGuard)
  @Get('current-user')
  getCurrentUserOrCompany(@UserId() id : string){
    return this.authService.getCurrentUserOrCompany(id)
  }
}
