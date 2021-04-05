import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entity/account.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(Account)
    private readonly AccountRepo: Repository<Account>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { session } = context.switchToHttp().getRequest();
    const username = session.get('login');
    if (username === undefined) {
      return false;
    }
    const account = await this.AccountRepo.findOne({ username: username });
    return account !== undefined;
  }
}
