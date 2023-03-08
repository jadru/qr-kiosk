import { ApiProperty } from '@nestjs/swagger';
export class CreateMenuItemDto {
    @ApiProperty()
    item_id: string;
    @ApiProperty()
    photo: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    menu_id: number;
}
