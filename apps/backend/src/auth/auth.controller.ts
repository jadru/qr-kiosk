import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { OwnerService } from 'src/owner/owner.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ResponseDto } from 'src/owner/dto/response-owner.dto';
import { TokenResponse } from './dto/token.response';
import { LoginRequest } from './dto/login.request';
import { Request } from './utils/request.types';

@Controller('auth')
@ApiTags('[인증] 계정')
export class AuthController {
    constructor(
        private readonly ownerService: OwnerService,
        private readonly authService: AuthService,
    ) {}

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'API 호출에 필요한 회원의 기본 정보를 호출합니다.',
    })
    @ApiBearerAuth()
    async getMyProfile(@Req() { owner }: Request): Promise<ResponseDto> {
        const ownerData = await this.ownerService.findById(owner.username);
        return new ResponseDto({
            ...ownerData,
        });
    }

    @Post('login')
    @ApiOperation({ summary: '로그인을 진행합니다.' })
    @ApiBody({ type: LoginRequest })
    @ApiResponse({
        type: TokenResponse,
    })
    async kakaoLogin(@Body() data: LoginRequest): Promise<TokenResponse> {
        // 카카오 토큰 조회 후 계정 정보 가져오기
        const owner = await this.ownerService.findByIdandPass(data);
        return this.authService.login(owner.username);
    }
}
