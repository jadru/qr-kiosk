import { Menu_Item } from '@prisma/client';
export class MenuItem implements Menu_Item {
    id: number;
    menu_id: number;
    item_id: string;
    category_name: string;
    photo: string;
    price: number;
    name: string;

    order_DetailId: number;
    
    createdTime: Date;
    updatedTime: Date;
}
