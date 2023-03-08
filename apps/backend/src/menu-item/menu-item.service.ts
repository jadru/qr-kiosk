import { Injectable, HttpException } from '@nestjs/common';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { PrismaService } from 'prisma/prisma.service';
import { MenuService } from '../menu/menu.service';
import { CreateMenuItemsDto } from './dto/create-menu-items.dto';
import { Menu_Item } from '@prisma/client';
@Injectable()
export class MenuItemService {
    constructor(private readonly prisma: PrismaService) {}

    create(createMenuItemDto: CreateMenuItemDto) {
        return this.prisma.menu_Item.create({ data: createMenuItemDto });
    }

    async createAtCategory(
        category_name: string,
        createMenuItemsDto: CreateMenuItemsDto,
    ) {
        const findMenu = await this.prisma.menu.findFirst({
            where: { category_name },
        });

        if (!findMenu)
            throw new HttpException('해당 카테고리가 없습니다.', 404);
            
        createMenuItemsDto.menu_items.forEach((item) => {
            item.menu_id = findMenu.id;
        });

        return this.prisma.menu_Item.createMany({
            data: createMenuItemsDto.menu_items,
        });
    }

    findAll() {
        return this.prisma.menu_Item.findMany();
    }

    findOne(id: number) {
        return this.prisma.menu_Item.findUnique({
            where: { id },
        });
    }

    update(id: number, updateMenuItemDto: UpdateMenuItemDto) {
        return this.prisma.menu_Item.update({
            where: { id },
            data: updateMenuItemDto,
        });
    }

    updateImage(id: number, image_url: string) {
        return this.prisma.menu_Item.update({
            where: { id },
            data: { image_url },
        });
    }

    remove(id: number) {
        return `This action removes a #${id} menuItem`;
    }
    removeAllByOwnerId(id: number) {
        return this.prisma.menu_Item.deleteMany({ where: { menu_id: id } });
    }
}
