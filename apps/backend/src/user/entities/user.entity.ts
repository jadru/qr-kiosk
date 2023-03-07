import { User } from '@prisma/client';

export class UserEntity implements User {
    
    id: number;
    
    username: string;

    name: string;
    
    password: string;
    
    createdTime: Date;

    updatedTime: Date;
}