import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { Respond } from '../interfaces/respond.interface';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  /**
   * 使用Get方法检查登录
   */
  @Get()
  async LoginCheck(): Promise<Respond> {
    // TODO: TGT SESSION 的判断
    return await this.loginService.CheckLogin();
  }

  /**
   * 使用Post方法，判断登录及重定向
   *
   * @param params
   * @param res
   */
  @Post()
  async SignIn(@Query() params, @Res() res): Promise<void> {
    const result: Respond = await this.loginService.SignIn(params);
    // 当登录成功时返回 302 重定向
    if (result.statusCode === 200) {
      // TODO: 重定向时加入ServerTicket
      res.status(302).redirect(params.service);
    }
    res.send(result);
  }
}
