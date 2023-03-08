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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'src/auth/utils/request.types';
import { MenuService } from '../menu/menu.service';
import { Logger } from '@nestjs/common';
import { MenuItemService } from '../menu-item/menu-item.service';

@Controller('owner')
@ApiTags('사장님')
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
    @Post('create')
    @ApiOperation({
        summary: '사장님 생성 API',
        description: '사장님 생성 API',
    })
    create(@Body() createOwnerDto: CreateOwnerDto, @Req() { owner }: Request) {
        console.log(owner);
        return this.ownerService.create(createOwnerDto);
    }

    @Get('all')
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

    @Post('update')
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
                store_address: string;
                store_operating_time: string;
                store_phone: string;
                facilities: string;
                name: string;
                email: string;
                phone: string;
                store_name: string;
                theme: 'cute' | 'modern' | 'vintage' | 'simple';
            };
            menu: [
                {
                    category_name: string;
                    owner_id: number;
                    menus: [
                        {
                            item_id: string;
                            name: string;
                            photo: string;
                            price: number;
                            menu_id: number;
                        },
                    ];
                },
            ];
        },
    ) {
        this.ownerService.update(username, Body.information);
        this.menuService.removeAll();
        this.menuItemService.removeAll();
        for (let index = 0; index < Body.menu.length; index++) {
            //this.menuService.createAt(Body.menu.map((item) => item.category_name),Body.menu.map((item) => item.owner_id));
            this.menuService.createAt(
                Body.menu[index].category_name,
                Body.menu[index].owner_id,
            );
        }
        for (let index = 0; index < Body.menu.length; index++) {
            for (let i = 0; i < Body.menu[index].menus.length; i++) {
                this.menuItemService.create(Body.menu[index].menus[i]);
            }
        }
        return;
    }
    //

    @Get()
    findOne(@Param('owner_id') id: number) {
        return this.ownerService.findByOwnerId(id);
    }
    
    @Post()
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

    @Delete()
    remove(@Param('store_name') store_name: string) {
        return this.ownerService.remove(store_name);
    }
}
