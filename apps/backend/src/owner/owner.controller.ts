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
    ParseIntPipe,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'src/auth/utils/request.types';
import { MenuService } from '../menu/menu.service';
import { Logger } from '@nestjs/common';
import { MenuItemService } from '../menu-item/menu-item.service';
import { Owner } from '@prisma/client';

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

    @Post('/create')

    @ApiOperation({
        summary: '사장님 생성 API',
        description: '사장님 생성 API',
    })
    create(@Body() createOwnerDto: CreateOwnerDto, @Req() { owner }: Request) {
        console.log(owner);
        return this.ownerService.create(createOwnerDto);
    }

    @Get('/list')
    @ApiOperation({
        summary: '사장님 전체 조회 API',
        description: '사장님 전체 조회 API',
    })
    async findAll() {
        const own = await this.ownerService.findAll();
        const category = await this.menuService.findAll();
        const menus = await this.menuItemService.findAll();
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
    @Post(':username')
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
                id: number;
                password: string;
                store_address: string;
                store_operating_time: string;
                store_phone: string;
                facilities: string;
                name: string;
                email: string;
                phone: string;
                store_name: string;
                photo: string[];
                facility: string;
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
        for (let index = 0; index < Body.menu.length; index++) {
            this.menuService.removeAllByOwnerId(Body.menu[index].owner_id);
        }
        for (let index = 0; index < Body.menu.length; index++) {
            for (let i = 0; i < Body.menu[index].menus.length; i++) {
                this.menuItemService.removeAllByOwnerId(
                    Body.menu[index].menus[i].menu_id,
                );
            }
        }
        for (let index = 0; index < Body.menu.length; index++) {
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

    @Get(':owner_id')
    findOne(@Param('owner_id', ParseIntPipe) owner_id: number): Promise<Owner> {
        console.log(owner_id);
        console.log();
        return this.ownerService.findByOwnerId(owner_id);
    }
    @Patch(':username')
    @ApiParam({
        name: 'username',
        description: '사장님 아이디',
    })    
    @ApiOperation({
        summary: '사장님 정보 최신화',
        description: '사장님 정보 업데이트',
    })
    update(
        @Param('username') username: string,
        @Body() updateOwnerDto: UpdateOwnerDto,
    ) {
        console.log(username);
        return this.ownerService.update(username, updateOwnerDto);
    }
    @Delete(':store_name')
    remove(@Param('store_name') store_name: string) {
        return this.ownerService.remove(store_name);
    }
}
