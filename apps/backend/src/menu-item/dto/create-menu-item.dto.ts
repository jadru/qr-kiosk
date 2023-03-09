import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuItemDto {
    @ApiProperty()
    image_url: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    menu_id: number;
}
