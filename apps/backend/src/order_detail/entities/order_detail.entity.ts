import { ApiProperty } from '@nestjs/swagger';
import { Order_Detail, Menu_Item } from '@prisma/client';
import { OwnerEntity } from '../../owner/entities/owner.entity';
import { MenuItemEntity } from '../../menu-item/entities/menu-item.entity';
import { ItemOrderEntity } from '../../item_order/entities/item_order.entity';

export class OrderDetailEntity implements Order_Detail {
    @ApiProperty()
    id: string;

    @ApiProperty()
    table_number: number;

    @ApiProperty()
    order_name: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    approveAt: Date | null;

    @ApiProperty()
    requestAt: Date | null;

    @ApiProperty()
    total_amount: number;

    @ApiProperty()
    toss_status: string;

    @ApiProperty()
    order_status: string;

    @ApiProperty()
    owner_id: number;

    @ApiProperty()
    user_id: string;

    item_orders: ItemOrderEntity[];
}