import { Injectable } from '@nestjs/common';
import { Respond } from '../../interfaces/respond.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { Account } from '../../entity/account.entity';
import { RegisteredSystem } from '../../entity/registeredSystem.entity';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Account)
    private readonly AccountRepo: Repository<Account>,
    @InjectRepository(RegisteredSystem)
    private readonly RegisteredSystemRepo: Repository<RegisteredSystem>,
  ) {}

  /**
   * Code by HTY 2021.3.28
   * @param params: {
   *  usr: 用户名
   *  pwd: MD5加密之后的密码
   *  service: 要登录的目标站点
   * }
   * @param params
   * @param session 传入session对象用于签发
   *
   * @return Respond:{
   *  statusCode: 状态码
   *  message: 消息
   * }
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

    //判断是否正在重置密码
    if (account.forgetPasswordValidateCode !== '') {
      await this.AccountRepo.update(account.uid, {
        forgetPasswordValidateCode: '',
      });
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
   * @param session 获取登录状态
   *
   * 检查登录函数
   * @return statusCode
   * @return message
   */
  async CheckLogin(session): Promise<Respond> {
    //检查是否存在Session
    const usr = session.get('login');
    if (usr === undefined) {
      return {
        statusCode: 403,
        message: 'not Login',
      };
    }

    //签发JWT
    const ServerTicket = this.jwtService.sign({
      username: usr,
      timeStamp: new Date().getTime(),
    });

    return {
      statusCode: 200,
      message: 'Login Success',
      data: {
        ServerTicket: ServerTicket,
      },
    };
  }
}