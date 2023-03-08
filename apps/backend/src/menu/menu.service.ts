import { Injectable } from '@nestjs/common';
import { Menu, Prisma, Owner } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
    constructor(private readonly prisma: PrismaService) {}

    create(createMenuDto: CreateMenuDto): Promise<Menu> {
        return this.prisma.menu.create({ data: createMenuDto });
    }
    
    createAt(category_name: string, owner_id: number): Promise<Menu> {
        return this.prisma.menu.create({
            data: {
                category_name,
                owner_id,
            },
        });
    }
    findAll() {
        return this.prisma.menu.findMany();
    }

    findOne(id: number) {
        return `This action returns a #${id} menu`;
    }

    update(Owner_id: number, updateMenuDto: UpdateMenuDto) {
        return `This action updates a #${Owner_id} menu`;
    }

    remove(id: number) {
        return `This action removes a #${id} menu`;
    }
    removeAll() {
        return this.prisma.menu.deleteMany();
    }
}
