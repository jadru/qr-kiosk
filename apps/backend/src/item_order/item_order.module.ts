import { Module } from '@nestjs/common';
import { ItemOrderService } from './item_order.service';
import { ItemOrderController } from './item_order.controller';

@Module({
  controllers: [ItemOrderController],
  providers: [ItemOrderService]
})
export class ItemOrderModule {}
