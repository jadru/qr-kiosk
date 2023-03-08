import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [PrismaModule],
})
export class UserModule {}
