import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { OwnerModule } from '../owner/owner.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const issuer = configService.get<string>(
                    'APP_URL',
                    'https://localhost:3000',
                );
                return {
                    secret: configService.get<string>('APP_SECRET', 'secret'),
                    verifyOptions: { issuer },
                    signOptions: { issuer, notBefore: 0 },
                };
            },
        }),
        HttpModule.registerAsync({
            imports: [ConfigModule],

            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const timeout = configService.get<number>(
                    'HTTP_TIMEOUT',
                    30000,
                );
                return {
                    timeout,
                };
            },
        }),
        OwnerModule,
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService],
    exports: [AuthService],
})
export class AuthModule {}
