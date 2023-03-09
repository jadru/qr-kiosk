import { Owner } from '@prisma/client';
export class LoginRequest implements Pick<Owner, 'username' | 'password'> {
    username: string;
    password: string;
}
