import { Module } from '@nestjs/common';
import { ModifyDetailController } from './modify-detail.controller';
import { ModifyDetailService } from './modify-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../entity/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [ModifyDetailController],
  providers: [ModifyDetailService],
})
export class ModifyDetailModule {}
