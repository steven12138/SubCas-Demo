import { Controller, Post, Query, Res } from '@nestjs/common';
import { SignupService } from './signup.service';
import { Respond } from '../interfaces/respond.interface';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  /**
   * 使用Post注册并跳转页面
   * @param params 传输参数
   * @param res 用于重定向和返回的原件
   */
  @Post()
  async Signup(@Query() params, @Res() res): Promise<void> {
    const result: Respond = await this.signupService.Signup(params);
    if (result.statusCode === 200) {
      res
        .status(302)
        .redirect(params.service + '?ST=' + result.data.ServerTicket);
    }
    res.send(result);
  }
}
