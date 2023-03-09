import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import UploadController from './upload.controller';
import UploadService from './upload.service';

@Module({
    controllers: [UploadController],
    providers: [UploadService],
    imports: [PrismaModule],
})

export class UploadModule {}
