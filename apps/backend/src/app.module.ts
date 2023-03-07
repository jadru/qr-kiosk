import { Module, Controller } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OwnerModule } from './owner/owner.module';
import { MenuModule } from './menu/menu.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UserModule,
        MenuItemModule,
        MenuModule,
        OwnerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
