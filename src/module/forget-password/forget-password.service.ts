import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../../entity/account.entity';
import { Respond } from '../../interfaces/respond.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { EnvConst } from '../../env/env';
import { GenerateToken } from '../../toolbox/token';

@Injectable()
export class ForgetPasswordService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Account)
    private readonly AccountRepo: Repository<Account>,
    private readonly mailerService: MailerService,
  ) {}


  /**
   *
   * @param username 用户名
   * @param mail 邮箱
   */
  async mailValidate(username: string, mail: string): Promise<Respond> {
    const account = await this.AccountRepo.findOne({ username: username });
    if (account.email !== mail) {
      return {
        statusCode: 403,
        message: 'Mail illegal',
      };
    }
    const MailValidateCode = GenerateToken(128);
    await this.AccountRepo.update(account.uid, {
      forgetPasswordValidateCode: MailValidateCode,
    });
    await this.mailerService.sendMail({
      to: account.email,
      from: EnvConst.mailFrom,
      subject: EnvConst.MPMailSubject,
      html:
        EnvConst.MPMailBodyPart1 +
        '<a href="' +
        EnvConst.MPSite +
        '?token=' +
        MailValidateCode +
        '">' +
        EnvConst.MPSiteLinkHint +
        '</a>' +
        EnvConst.MPMailBodyPart2,
    });
    return {
      statusCode: 200,
      message: 'Mail Sent Success',
    };
  }
}
