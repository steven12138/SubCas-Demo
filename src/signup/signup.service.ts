import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Respond } from '../interfaces/respond.interface';
import { Repository } from 'typeorm';
import { Account } from '../entity/account.entity';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(Account)
    private readonly AccountRepo: Repository<Account>,
  ) {}

  /**
   * 注册函数
   * @param params: {
   *   username
   *   nickname
   *   password
   *   email
   *   description
   * }
   *
   * @return statusCode
   * @return message
   */
  async Signup(params): Promise<Respond> {
    const username: string = params.username;
    const nickname: string = params.nickname;
    const password: string = params.password;
    const email: string = params.email;
    const description: string = params.description;
    await this.AccountRepo.insert({
      username: username,
      password: password,
      nickname: nickname,
      email: email,
      description: description,
    });

    return {
      statusCode: 302,
      message: 'helloWorld',
    };
  }
}
