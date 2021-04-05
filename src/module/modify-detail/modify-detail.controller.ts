import { Controller, Post, Query, Session, UseGuards } from '@nestjs/common';
import { ModifyDetailService } from './modify-detail.service';
import { Respond } from '../../interfaces/respond.interface';
import * as secureSession from 'fastify-secure-session';
import { AuthGuard } from '../../guard/auth.guard';

@Controller('modifyDetail')
export class ModifyDetailController {
  constructor(private readonly modifyDetailService: ModifyDetailService) {}

  /**
   * 路由，POST
   * @param params 传入参数
   * @param session 用于获取用户名&验证登录状态
   */
  @Post()
  @UseGuards(AuthGuard)
  async modifyDetail(
    @Query() params,
    @Session() session: secureSession.Session,
  ): Promise<Respond> {
    return await this.modifyDetailService.modifyDetail(
      params,
      session.get('login'),
    );
  }
}
