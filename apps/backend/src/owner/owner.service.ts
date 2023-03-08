import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OwnerService {
    constructor(private prisma: PrismaService) {}

    create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
        return this.prisma.owner.create({ data: createOwnerDto });
    }

    findAll() {
        return this.prisma.owner.findMany();
    }
    update(username: string, updateOwnerDto: UpdateOwnerDto) {
        return this.prisma.owner.update({
            where: { username },
            data: updateOwnerDto,
        });
    }
    findOneByStorename(username: string): Promise<Owner> {
        return this.prisma.owner.findFirst({ where: { username } });
    }
    remove(username: string) {
        return this.prisma.owner.delete({ where: { username } });
    }

    findById(username: string): Promise<Owner> {
        return this.prisma.owner.findFirst({ where: { username } });
    }

    findByIdandPass(data: {
        username: string;
        password: string;
    }): Promise<Owner> {
        const { username, password } = data;
        return this.prisma.owner.findFirst({
            where: { username, password },
        });
    }
}
