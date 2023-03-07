import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';

@Module({
  controllers: [OwnerController],
  providers: [OwnerService]
})
export class OwnerModule {}
