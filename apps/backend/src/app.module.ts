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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
