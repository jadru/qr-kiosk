import { ApiProperty } from '@nestjs/swagger';
import { CreateMenuItemCompactDto } from './create-menu-item-compact.dto ';
import { CreateMenuItemDto } from './create-menu-item.dto';

export class CreateMenuItemsDto {
    @ApiProperty({ type: [CreateMenuItemCompactDto] })
    menu_items: CreateMenuItemCompactDto[];
}
