import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { Respond } from '../interfaces/respond.interface';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  async LoginCheck(): Promise<Respond> {
    //TODO: TGT SESSION 的判断
    return await this.loginService.CheckLogin();
  }

  @Post()
  async SignIn(@Query() params, @Res() res): Promise<void> {
    const result: Respond = await this.loginService.SignIn(params);
    //302 Redirect When Login Success.
    if (result.statusCode === 200) {
      //TODO: 重定向时加入ServerTicket
      res.status(302).redirect(params.service);
    }
    res.send(result);
  }
}
