import { Module } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailController } from './order_detail.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
  imports: [PrismaService]
})

export class OrderDetailModule {}
