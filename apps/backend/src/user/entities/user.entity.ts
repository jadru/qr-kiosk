import { User } from '@prisma/client';

export class UserEntity implements User {
    id: string;

    createdTime: Date;

    updatedTime: Date;
}
