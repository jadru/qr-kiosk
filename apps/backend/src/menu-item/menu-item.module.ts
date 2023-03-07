import { Module } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { MenuItemController } from './menu-item.controller';

@Module({
  controllers: [MenuItemController],
  providers: [MenuItemService]
})
export class MenuItemModule {}
