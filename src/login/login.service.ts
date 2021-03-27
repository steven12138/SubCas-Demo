import { Injectable } from '@nestjs/common';
import { Respond } from '../interfaces/respond.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { account } from '../entity/account.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(account) private readonly AccountReop: Repository<account>,
  ) {
  }

  SignIn(params): Respond {
    const usr = params.usr;
    const pwd = params.pwd;
    return {
      statusCode: 202,
      message: 'Still in Development',
    };
  }

  async CheckLogin(): Promise<Respond> {
    const result = await this.AccountReop.findOne({ username: 'steven12138' });
    console.log(result);
    return {
      statusCode: 200,
      message: 'helloworld',
    };
  }
}
