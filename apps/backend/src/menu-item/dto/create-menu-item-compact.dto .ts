import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuItemCompactDto {

    @ApiProperty()
    image_url: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    name: string;
    
    menu_id: number;
}
