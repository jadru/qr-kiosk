import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PrismaClient } from '@prisma/client';

@Module({
    controllers: [MenuController],
    providers: [MenuService],
    imports: [PrismaClient],
    exports: [MenuService],
})
export class MenuModule {}
