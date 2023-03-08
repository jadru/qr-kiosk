import { Order_Detail, Menu_Item } from '@prisma/client';

export class OrderDetailEntity implements Order_Detail {
    id: number;
    status: string;
    approveAt: Date;
    requestAt: Date;
    total_amount: number;
    order_name: string;
    owner_id: number;
}