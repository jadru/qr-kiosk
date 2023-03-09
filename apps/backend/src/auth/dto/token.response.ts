import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
    @ApiProperty({
        description: 'API 호출에 필요한 JWT Access Token',
    })
    accessToken: string;

    constructor(tokens: { accessToken: string }) {
        Object.assign(this, tokens);
    }
}
