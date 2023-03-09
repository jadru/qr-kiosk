import { Request as ExpressRequest } from 'express';
import { Owner } from '@prisma/client';

export type Request = ExpressRequest & {
    owner: Owner;
};
