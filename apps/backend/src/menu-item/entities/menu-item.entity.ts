import { Menu_Item } from '@prisma/client';
export class MenuItem implements Menu_Item {
    category_name: string;
    item_id: string;
    photo: string;
    price: number;
    name: string;
    id: number;
    menu_id: number;
    createdTime: Date;
    updatedTime: Date;
}
