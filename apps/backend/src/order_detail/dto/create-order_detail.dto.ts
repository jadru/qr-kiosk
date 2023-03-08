import { ApiProperty } from "@nestjs/swagger";
import { MenuItemEntity } from "src/menu-item/entities/menu-item.entity";
import { Menu_Item } from '@prisma/client';
import { OwnerEntity } from '../../owner/entities/owner.entity';
import { ItemOrderEntity } from "src/item_order/entities/item_order.entity";

export class CreateOrderDetailDto {
    @ApiProperty()
    order_name: string;
    
    @ApiProperty()
    total_amount: number;
    
    @ApiProperty()
    toss_status: string;
    
    @ApiProperty()
    order_status: string;
    
    @ApiProperty()
    approveAt: Date | null;

    @ApiProperty()
    requestAt: Date | null;

    @ApiProperty()
    owner_id: number;

    @ApiProperty()
    user_id: string;

    @ApiProperty()
    item_orders: number[];
}
