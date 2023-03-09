import { ApiProperty } from '@nestjs/swagger';
import { Menu_Item } from '@prisma/client';
import { CreateMenuItemDto } from 'src/menu-item/dto/create-menu-item.dto';

export class CreateMenuAllDto {
    @ApiProperty()
    category_name: string;

    @ApiProperty()
    owner_id: number;

    @ApiProperty({ type: [CreateMenuItemDto] })
    menu_items: CreateMenuItemDto[];
    
}
