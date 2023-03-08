import { Menu_Item } from '@prisma/client';
export class MenuItemEntity implements Menu_Item {
    id: number;
    
    menu_id: number;
    
    item_id: string;
    
    category_name: string;
    
    image_url: string;
    
    price: number;

    name: string;

    order_DetailId: number;
    
    createdTime: Date;
    
    updatedTime: Date;
}
