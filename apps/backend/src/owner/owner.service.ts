import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateOwnerAllDto } from './dto/update-owner-all.dto';

@Injectable()
export class OwnerService {
    constructor(private prisma: PrismaService) {}

    create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
        return this.prisma.owner.create({ data: createOwnerDto });
    }
    findAll() {
        return this.prisma.owner.findMany();
    }

    findAllWithMenus() {
        return this.prisma.owner.findMany({include: { menu: { include: { menu_items: true }} }});
    }

    update(id: number, updateOwnerDto: UpdateOwnerDto) {
        return this.prisma.owner.update({
            where: { id },
            data: { ...updateOwnerDto, menu: {} },
        });
    }


    updateAll(id: number, updateOwnerDto: UpdateOwnerAllDto) {
        return this.prisma.owner.update({
            where: { id },
            data: {
                ...updateOwnerDto,
                menu: {
                    updateMany: {
                        where: { id: { in: updateOwnerDto.menu.map((menu) => menu.id) } },
                        data: updateOwnerDto.menu
                    }
                }
            },
        });
    }
    
    findByOwnerId(id: number): Promise<Owner> {
        return this.prisma.owner.findFirst({ where: { id }, include: { menu: { include: { menu_items: true }} }});
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
