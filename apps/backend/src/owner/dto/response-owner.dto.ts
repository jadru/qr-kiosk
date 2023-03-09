import { ApiProperty } from '@nestjs/swagger';
import { Menu } from '@prisma/client';
export class ResponseDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    store_phone: string;
    @ApiProperty()
    store_address: string;
    @ApiProperty()
    store_operating_time: string;
    @ApiProperty()
    store_name: string;
    @ApiProperty()
    menu?: Menu;

    constructor(data: ResponseDto) {
        Object.assign(this, data);
    }
}
