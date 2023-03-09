import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtDecodedData, JwtSubjectType } from '../utils/jwt.types';
import { Owner } from '@prisma/client';
import { OwnerService } from 'src/owner/owner.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly OwnerService: OwnerService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('APP_SECRET', 'secret'),
            ignoreExpiration: false,
        });
    }

    async validate(data: JwtDecodedData): Promise<Owner> {
        if (data.sub !== JwtSubjectType.ACCESS) {
            throw new Error('Invalid token');
        }

        return this.OwnerService.findById(data.username);
    }
}
