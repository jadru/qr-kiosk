import { ApiProperty } from "@nestjs/swagger";
import { Item_Order } from "@prisma/client";

export class ItemOrderEntity implements Item_Order{
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    count: number;
    
    @ApiProperty()
    menu_item_id: number;  
    
    @ApiProperty()
    order_DetailId: string;
}
