import { Module } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailController } from './order_detail.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
  imports: [PrismaModule]
})

export class OrderDetailModule {}
