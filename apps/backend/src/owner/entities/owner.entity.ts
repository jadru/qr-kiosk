import { Owner } from '@prisma/client';

export class OwnerEntity implements Owner {
    id: number;
    username: string;
    password: string;

    email: string;

    phone: string;

    name: string;
    
    store_name: string;

    store_phone: string;

    store_address: string;

    store_operating_time: string;
    
    theme: string;
    createdTime: Date;
    updatedTime: Date;
}
