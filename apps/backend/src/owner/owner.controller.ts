import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
    Res,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'src/auth/utils/request.types';
import { MenuService } from '../menu/menu.service';
import { Logger } from '@nestjs/common';
import { MenuItemService } from '../menu-item/menu-item.service';
@Controller('owner')
export class OwnerController {
    constructor(
        private readonly ownerService: OwnerService,
        private readonly menuService: MenuService,
        private readonly menuItemService: MenuItemService,
    ) {
        this.ownerService = ownerService;
        this.menuService = menuService;
        this.menuItemService = menuItemService;
    }

    // @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    @ApiOperation({
        summary: '사장님 생성 API',
        description: '사장님 생성 API',
    })
    create(@Body() createOwnerDto: CreateOwnerDto, @Req() { owner }: Request) {
        console.log(owner);
        return this.ownerService.create(createOwnerDto);
    }
    @Get(':list')
    @HttpCode(200)
    @ApiOperation({
        summary: '사장님 전체 조회 API',
        description: '사장님 전체 조회 API',
    })
    async findAll() {
        const own = await this.ownerService.findAll();
        const category = await this.menuService.findAll();
        const menus = await this.menuItemService.findAll();
        Logger.log(menus);
        // return {
        //     information: [own, menu],
        // };

        return own.map((item) => {
            return {
                information: {
                    ...item,
                    menu: {
                        ...category.map((item) => {
                            return {
                                ...item,
                                menu: [
                                    ...menus.filter((menuitem) => {
                                        return menuitem.menu_id === item.id;
                                    }),
                                ],
                            };
                        }),
                    },
                },
            };
        });
    }
    // post test cjs : 23.3.8 add post menuList(owner,menu)
    @Post(':list')
    @ApiOperation({
        summary: '사장님 전체 받기  API',
        description: '사장님 전체 받기 API',
    })
    receiveInfo(
        @Param('username') username: string,
        @Body()
        Body: {
            name: string;
            information: {
                address: string;
                openTime: string;
                phoneNumber: string;
                facilities: string;
                website: string;
                photos: string[];
                theme: 'cute' | 'modern' | 'vintage' | 'simple';
            };
            menu: [
                {
                    categoryName: string;
                    menus: [
                        {
                            itemid: string;
                            itemname: string;
                            image: string;
                            itemprice: string;
                        },
                    ];
                },
            ];
        },
    ) {
        this.ownerService.update(username, Body.information);
        this.menuService.removeAll();
        this.menuItemService.removeAll();
        return;
    }
    //

    @Get(':id')
    findOne(@Param('store_name') store_name: string) {
        return this.ownerService.findOneByStorename(store_name);
    }
    @Get()
    @ApiOperation({
        summary: '사장님 정보 최신화',
        description: '사장님 정보 업데이트',
    })
    update(
        @Param('username') username: string,
        @Body() updateOwnerDto: UpdateOwnerDto,
    ) {
        return this.ownerService.update(username, updateOwnerDto);
    }

    @Delete(':id')
    remove(@Param('store_name') store_name: string) {
        return this.ownerService.remove(store_name);
    }
}
