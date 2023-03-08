import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('menu')
@ApiTags('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Post()
    @ApiOperation({
        summary: '메뉴 카테고리 생성 API',
        description: '메뉴 카테고리를 생성한다.',
    })
    create(@Body() createMenuDto: CreateMenuDto) {
        return this.menuService.create(createMenuDto);
    }

    @Get(':owner_id/list')
    @ApiOperation({
        summary: '메뉴 전체 조회 API',
        description: '메뉴 전체 조회한다.',
    })
    findAll() {
        return this.menuService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.menuService.findOne(+id);
    }

    @Patch(':owner_id')
    @ApiOperation({
        summary: '해당 사장님 메뉴 수정 API',
        description: '메뉴 추가',
    })
    update(
        @Param('owner_id') owner_id: number,
        @Body() updateMenuDto: UpdateMenuDto,
    ) {
        return this.menuService.update(owner_id, updateMenuDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.menuService.remove(+id);
    }
}
