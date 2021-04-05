import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisteredSystem } from '../entity/registeredSystem.entity';

@Injectable()
export class ServiceGuard implements CanActivate {
  constructor(
    @InjectRepository(RegisteredSystem)
    private readonly RegisteredSystemRepo: Repository<RegisteredSystem>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { query } = context.switchToHttp().getRequest();
    const service = query.service;
    const result = await this.RegisteredSystemRepo.findOne({ url: service });
    return result !== undefined;
  }
}
