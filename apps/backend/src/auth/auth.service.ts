import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenResponse } from './dto/token.response';
import { JwtSubjectType } from './utils/jwt.types';
import { OwnerService } from 'src/owner/owner.service';
import { Owner } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly OwnerService: OwnerService,
    ) {}

    async login(username: string): Promise<TokenResponse> {
        const owner = await this.OwnerService.findById(username);

        const accessToken = await this.generateAccessToken(owner);
        return { accessToken };
    }

    protected async generateAccessToken(owner: Owner): Promise<string> {
        return this.jwtService.signAsync(
            { owner_id: owner.id, username: owner.username },
            {
                expiresIn: '2d',
                subject: JwtSubjectType.ACCESS,
            },
        );
    }
}
