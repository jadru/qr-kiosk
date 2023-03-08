import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';
import { multerOptions } from 'src/image/lib/multerOptions';
import { CreateMenuItemsDto } from './dto/create-menu-items.dto';

@Controller('menu-item')
@ApiTags('메뉴 아이템')
export class MenuItemController {
    constructor(private readonly menuItemService: MenuItemService) {}

    @Post()
    @ApiOperation({ summary: '메뉴 아이템 생성 API' })
    create(@Body() createMenuItemDto: CreateMenuItemDto) {
        return this.menuItemService.create(createMenuItemDto);
    }


    @Post(':category_name')
    @ApiOperation({ summary: '해당 카테고리에 여러 메뉴 아이템 생성 API' })
    createItemsAtCategory(
        @Param('category_name') category_name: string,
        @Body() createMenuItemDtos: CreateMenuItemsDto
    ) {
        return this.menuItemService.createAtCategory(category_name, createMenuItemDtos);
    }


    @Get()
    findAll() {
        return this.menuItemService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.menuItemService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateMenuItemDto: UpdateMenuItemDto,
    ) {
        return this.menuItemService.update(+id, updateMenuItemDto);
    }

    @Patch(':id/image')
    updateImage(
        @Param('id') id: string,
        @Body() image_url: string,
    ) {
        return this.menuItemService.updateImage(+id, image_url);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.menuItemService.remove(+id);
    }
}
