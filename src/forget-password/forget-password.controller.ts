import { Controller, Post, Query, Session } from '@nestjs/common';
import { ForgetPasswordService } from './forget-password.service';
import { Respond } from '../interfaces/respond.interface';
import * as secureSession from 'fastify-secure-session';

@Controller('forgetPassword')
export class ForgetPasswordController {
  constructor(private readonly forgetPasswordService: ForgetPasswordService) {}

  @Post()
  async forgetPasswordMailValidate(@Query() params, @Session() session: secureSession.Session): Promise<Respond> {
    if (session.get('login')) {
      return {
        statusCode: 400,
        message: 'you are already login',
      };
    }
    return await this.forgetPasswordService.mailValidate(
      params.username,
      params.mail,
    );
  }
}
