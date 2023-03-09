import { ApiProperty } from '@nestjs/swagger';

export class CreateOwnerDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    phone: string | null;
    @ApiProperty({ required: false })
    store_phone: string | null;
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
