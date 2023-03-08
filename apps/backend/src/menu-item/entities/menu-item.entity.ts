import { ApiProperty } from '@nestjs/swagger';
import { Menu_Item } from '@prisma/client';
export class MenuItemEntity implements Menu_Item {
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    menu_id: number;

    @ApiProperty()
    item_id: string;

    @ApiProperty()
    category_name: string;

    @ApiProperty()
    image_url: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    order_DetailId: number;

    @ApiProperty({ readOnly: true})
    createdTime: Date;

    @ApiProperty({ readOnly: true})
    updatedTime: Date;
}
