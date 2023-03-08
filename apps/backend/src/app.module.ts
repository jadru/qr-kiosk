import { Module, Controller } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwnerModule } from './owner/owner.module';
import { MenuModule } from './menu/menu.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OrderDetailModule } from './order_detail/order_detail.module';
import { ItemOrderModule } from './item_order/item_order.module';
import { UploadModule } from './image/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UserModule,
        MenuItemModule,
        MenuModule,
        OwnerModule,
        AuthModule,
        OrderDetailModule,
        ItemOrderModule,
        UploadModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
