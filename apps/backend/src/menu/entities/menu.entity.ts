import { ApiProperty } from '@nestjs/swagger';
import { Menu } from '@prisma/client';
import { MenuItemEntity } from '../../menu-item/entities/menu-item.entity';

export class MenuEntity implements Menu {
    @ApiProperty()
    id: number;

    @ApiProperty()
    category_name: string;

    @ApiProperty()
    owner_id: number;

    @ApiProperty()
    createdTime: Date;

    @ApiProperty()
    updatedTime: Date;

    menuItem: MenuItemEntity[];
}
