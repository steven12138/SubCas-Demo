import { Injectable } from '@nestjs/common';
import { Respond } from '../interfaces/respond.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { Account } from '../entity/account.entity';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Account)
    private readonly AccountRepo: Repository<Account>,
  ) {}

  /**
   * Code by HTY 2021.3.28
   * @param params: {
   *  usr: 用户名
   *  pwd: MD5加密之后的密码
   *  service: 要登录的目标站点
   * }
   * @param session 传入session对象用于签发
   *
   * @return statusCode
   * @return message
   */
  async SignIn(params, session): Promise<Respond> {
    const usr = params.usr;
    const pwd = params.pwd;
    const service = params.service;
    if (usr === '' || pwd === '' || service === '') {
      return {
        statusCode: 411,
        message: 'Some Argument are NULL',
      };
    }

    // 获取用户信息
    const account = await this.AccountRepo.findOne({ username: usr });
    // 用户不存在
    if (account === undefined) {
      return {
        statusCode: 404,
        message: 'User Not Found',
      };
    }

    // 检查邮箱有效性
    if (account.emailValidateCode !== '') {
      return {
        statusCode: 206,
        message: 'email invalidate',
      };
    }

    // 检查密码是否正确
    if (account.password !== pwd) {
      return {
        statusCode: 403,
        message: 'Password Error',
      };
    }

    // 登录成功
    //JWT签发
    const ServerTicket = this.jwtService.sign({
      username: usr,
      timeStamp: new Date().getTime(),
    });

    //签发TGT
    session.set('login', usr);

    return {
      statusCode: 200,
      message: 'LoginSuccess',
      data: {
        ServerTicket: ServerTicket,
      },
    };
  }

  // TODO: 完善检查登录函数
  /**
   * 检查登录函数
   * @return statusCode
   * @return message
   */
  async CheckLogin(): Promise<Respond> {
    const result = await this.AccountRepo.findOne({ username: 'steven12138' });
    console.log(result);
    return {
      statusCode: 200,
      message: 'helloWorld',
    };
  }
}
