import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EnvConst } from '../env/env';

@Injectable()
export class ModifyDetailService {
  constructor(private readonly mailerService: MailerService) {}

  test(): void {
    this.mailerService
      .sendMail({
        to: 'hetianyang@i.pkuschool.edu.cn',
        subject: 'HelloWorld',
        text: 'HelloWorld',
        from: EnvConst.mailFrom,
      })
      .then(() => {
        console.log('success');
      })
      .catch(() => {});
  }
}
