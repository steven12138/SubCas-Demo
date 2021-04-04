import { Injectable } from '@nestjs/common';
import { Respond } from '../interfaces/respond.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entity/account.entity';

@Injectable()
export class ModifyDetailService {
  constructor(
    @InjectRepository(Account)
    private readonly AccountRepo: Repository<Account>,
  ) {}

  /**
   * 修改详细信息
   * @param params POST参数
   * @param username 用户的用户名
   */
  async modifyDetail(params, username: string): Promise<Respond> {
    const nickname = params.nickname;
    const description = params.description;

    //如果传输参数存在昵称则更新
    if (nickname) {
      await this.AccountRepo.update(
        { username: username },
        {
          nickname: nickname,
        },
      );
    }

    //同上
    if (description) {
      await this.AccountRepo.update(
        { username: username },
        {
          description: description,
        },
      );
    }

    return {
      statusCode: 200,
      message: 'Update Success',
    };
  }
}
