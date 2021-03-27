import { Injectable } from '@nestjs/common';
import { Respond } from '../interfaces/respond.interface';

@Injectable()
export class LoginService {
  SignIn(params): Respond {
    const usr = params.usr;
    const pwd = params.pwd;
    const respond: Respond = {
      code: 404,
      status: 'error',
      description: 'still developing',
    };
    return respond;
  }
}
