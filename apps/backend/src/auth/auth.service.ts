import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenResponse } from './dto/token.response';
import { JwtSubjectType } from './utils/jwt.types';
import { OwnerService } from 'src/owner/owner.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly OwnerService: OwnerService,
    ) {}

    async login(username: string): Promise<TokenResponse> {
        const owner = await this.OwnerService.findById(username);

        const accessToken = await this.generateAccessToken(owner.username);
        return { accessToken };
    }

    protected async generateAccessToken(username: string): Promise<string> {
        return this.jwtService.signAsync(
            { owner_id: username },
            {
                expiresIn: '2d',
                subject: JwtSubjectType.ACCESS,
            },
        );
    }
}
