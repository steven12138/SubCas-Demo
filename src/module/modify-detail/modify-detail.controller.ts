import { Controller, Post, Query, Session } from '@nestjs/common';
import { ModifyDetailService } from './modify-detail.service';
import { Respond } from '../../interfaces/respond.interface';
import * as secureSession from 'fastify-secure-session';

@Controller('modifyDetail')
export class ModifyDetailController {
  constructor(private readonly modifyDetailService: ModifyDetailService) {}

  /**
   * 路由，POST
   * @param params 传入参数
   * @param session 用于获取用户名&验证登录状态
   */
  @Post()
  async modifyDetail(
    @Query() params,
    @Session() session: secureSession.Session,
  ): Promise<Respond> {
    const username = session.get('login');
    if (username === undefined) {
      return {
        statusCode: 403,
        message: 'Not Login',
      };
    }
    return await this.modifyDetailService.modifyDetail(params, username);
  }
}
