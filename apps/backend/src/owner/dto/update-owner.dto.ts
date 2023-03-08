import { ApiProperty } from '@nestjs/swagger';
export class UpdateOwnerDto {
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
    theme?: string;
    @ApiProperty()
    photo: string[];
    @ApiProperty()
    facility?: string;
}
