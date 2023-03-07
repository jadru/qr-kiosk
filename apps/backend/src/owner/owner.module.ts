import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
    controllers: [OwnerController],
    providers: [OwnerService],
    imports: [PrismaModule],
})
export class OwnerModule {}
