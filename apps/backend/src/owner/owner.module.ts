import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { MenuModule } from 'src/menu/menu.module';
import { MenuItemModule } from 'src/menu-item/menu-item.module';
@Module({
    controllers: [OwnerController],
    providers: [OwnerService],
    imports: [PrismaModule, MenuModule, MenuItemModule],
    exports: [OwnerService],
})
export class OwnerModule {}
