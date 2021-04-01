import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Respond } from '../interfaces/respond.interface';
import { Repository, getConnection } from 'typeorm';
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
    const username = params.username;
    const nickname = params.nickname;
    const password = params.password;
    const email = params.email;
    const description = params.description;

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Account)
      .values([
        {
          username: username,
          nickname: nickname,
          password: password,
          email: email,
          description: description,
        },
      ])
      .execute();

    return {
      statusCode: 302,
      message: 'helloWorld',
    };
  }
}
