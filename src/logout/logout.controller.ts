import { Controller, Get } from '@nestjs/common';
import { Respond } from '../interfaces/respond.interface';

@Controller('logout')
export class LogoutController {
  @Get()
  Logout(): Respond {
    return {
      statusCode: 200,
      message: 'success',
    };
  }
}
