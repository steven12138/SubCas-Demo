import { Controller, Get, Query } from '@nestjs/common';
import { Respond } from '../interfaces/respond.interface';
import { ValidateService } from './validate.service';

@Controller('validate')
export class ValidateController {
  constructor(private readonly validateService: ValidateService) {}

  /**
   *
   * @param params:{
   *   ST: ServerTicket
   * }
   *
   * @return Respond:{
   *   data:个人信息
   * }
   */
  @Get()
  async checkServerTicket(@Query() params): Promise<Respond> {
    return await this.validateService.checkServerTicket(params);
  }
}
