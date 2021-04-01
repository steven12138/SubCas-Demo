import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Account } from '../entity/account.entity';
import { Repository } from 'typeorm';
import { Respond } from '../interfaces/respond.interface';

@Injectable()
export class ValidateService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Account)
    private readonly AccountRepo: Repository<Account>,
  ) {}

  /**
   * Code by HTY 2021.4.1
   * @param params:{
   *   ST: ServerTicket
   * }
   * @return Respond:{
   *   statusCode: 状态码
   *   message: 消息
   *   data: 用户信息
   * }
   */
  async checkServerTicket(params): Promise<Respond> {
    //检查ServerTicket
    const ServerTicket = params.ST;

    //检查JWT，获取payload
    let payload;
    try {
      payload = this.jwtService.verify(ServerTicket);
    } catch (e) {
      return {
        statusCode: 403,
        message: 'invalid ServerToken',
      };
    }

    //查找用户名获取账户信息
    const account = await this.AccountRepo.findOne({
      username: payload.username,
    });

    //检验用户是否存在
    if (account === undefined) {
      return {
        statusCode: 404,
        message: 'User Not Found',
      };
    }

    //删除密码和邮箱验证吗字段并返回
    delete account.password;
    delete account.emailValidateCode;
    return {
      statusCode: 200,
      message: 'Code Verified',
      data: account,
    };
  }
}
