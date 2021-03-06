import {
  Controller,
  Get,
  Headers,
  Ip,
  Post,
  Query,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { Respond } from '../../interfaces/respond.interface';
import * as secureSession from 'fastify-secure-session';
import { EnvConst } from '../../env/env';
import { ServiceGuard } from '../../guard/service.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  /**
   * 使用Get方法检查登录
   * @param params 传输参数
   * @param res 用于重定向和返回的原件
   * @param session session对象，签发session
   * @param IP
   * @param UA
   */
  @Get()
  @UseGuards(ServiceGuard)
  async LoginCheck(
    @Query() params,
    @Res() res,
    @Session() session: secureSession.Session,
    @Ip() IP,
    @Headers('User-Agent') UA,
  ): Promise<void> {
    const result = await this.loginService.CheckLogin(
      session,
      IP,
      UA,
      params.service,
    );
    switch (result.statusCode) {
      //Session Not Found
      case 403: {
        res
          .status(302)
          .redirect(EnvConst.LoginSite + '?service=' + params.service);
        break;
      }

      //Get Login
      case 200: {
        res
          .status(302)
          .redirect(params.service + '?ST=' + result.data.ServerTicket);
        break;
      }
    }
  }

  /**
   * 使用Post方法，判断登录及重定向
   *
   * @param params 传输参数
   * @param res 用于重定向和返回的原件
   * @param session session对象，签发session
   * @param IP
   * @param UA
   */
  @Post()
  @UseGuards(ServiceGuard)
  async SignIn(
    @Query() params,
    @Res() res,
    @Session() session: secureSession.Session,
    @Ip() IP,
    @Headers('User-Agent') UA,
  ): Promise<void> {
    const result: Respond = await this.loginService.SignIn(
      params,
      session,
      UA,
      IP,
    );
    // 当登录成功时返回 302 重定向
    if (result.statusCode === 200) {
      res
        .status(302)
        .redirect(params.service + '?ST=' + result.data.ServerTicket);
    }
    res.send(result);
  }
}
