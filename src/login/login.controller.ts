import { Controller, Get, Param, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { Respond } from '../interfaces/respond.interface';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  async LoginCheck(): Promise<Respond> {
    return await this.loginService.CheckLogin();
  }

  @Post()
  SignIn(@Param() params): Respond {
    return this.loginService.SignIn(params);
  }
}
