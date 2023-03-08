import { Injectable } from '@nestjs/common';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class MenuItemService {
    constructor(private readonly prisma: PrismaService) {}
    create(createMenuItemDto: CreateMenuItemDto) {
        return this.prisma.menu_Item.create({ data: createMenuItemDto });
    }

    findAll() {
        return this.prisma.menu_Item.findMany();
    }

    findOne(id: number) {
        return `This action returns a #${id} menuItem`;
    }

    update(id: number, updateMenuItemDto: UpdateMenuItemDto) {
        return `This action updates a #${id} menuItem`;
    }

    remove(id: number) {
        return `This action removes a #${id} menuItem`;
    }
    removeAllByOwnerId(id: number) {
        return this.prisma.menu_Item.deleteMany({ where: { menu_id: id } });
    }
}
