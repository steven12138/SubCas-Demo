import { Injectable } from '@nestjs/common';
import { Respond } from '../interfaces/respond.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from '../entity/account.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Account)
    private readonly AccountRepo: Repository<Account>,
  ) {}

  /*
  Code by HTY 2021.3.28
  params:{
    usr: 用户名
    pwd: MD5加密之后的密码
    service: 要登录的目标站点
  }
  res: 用于重定向，fastify包用法
  */
  async SignIn(params): Promise<Respond> {
    const usr = params.usr;
    const pwd = params.pwd;
    const service = params.service;
    if (usr === '' || pwd === '' || service === '') {
      return {
        statusCode: 411,
        message: 'Some Argument are NULL',
      };
    }
    //Get Account Info
    const account = await this.AccountRepo.findOne({ username: usr });
    if (account === undefined) {
      return {
        statusCode: 404,
        message: 'User Not Found',
      };
    }
    //Check Email validate
    if (account.emailValidateCode !== '') {
      return {
        statusCode: 206,
        message: 'email invalidate',
      };
    }
    //Check Password
    if (account.password !== pwd) {
      return {
        statusCode: 403,
        message: 'Password Error',
      };
    }

    //TODO: ServerTicket & TGT 签发

    return {
      statusCode: 200,
      message: 'LoginSuccess',
    };
  }

  async CheckLogin(): Promise<Respond> {
    const result = await this.AccountRepo.findOne({ username: 'steven12138' });
    console.log(result);
    return {
      statusCode: 200,
      message: 'helloWorld',
    };
  }
}
