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

@Controller('menu-item')
@ApiTags('메뉴 아이템')
export class MenuItemController {
    constructor(private readonly menuItemService: MenuItemService) {}

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: '메뉴 아이템 생성 API' })
    @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
    create(@Body() createMenuItemDto: CreateMenuItemDto) {
        return this.menuItemService.create(createMenuItemDto);
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

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.menuItemService.remove(+id);
    }
}
