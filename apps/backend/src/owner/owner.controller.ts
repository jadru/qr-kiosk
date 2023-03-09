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
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'src/auth/utils/request.types';
import { MenuService } from '../menu/menu.service';
import { Logger } from '@nestjs/common';
import { MenuItemService } from '../menu-item/menu-item.service';
import { Owner } from '@prisma/client';
import { UpdateMenuDto } from '../menu/dto/update-menu.dto';
import { UpdateMenuItemDto } from '../menu-item/dto/update-menu-item.dto';
import { UpdateOwnerAllDto } from './dto/update-owner-all.dto';

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
        return this.ownerService.findAllWithMenus();
    }

    // @Post(':owner_id')
    // @ApiOperation({
    //     summary: '사장님 전체 받기  API',
    //     description: '사장님 전체 받기 API',
    // })
    // receiveInfo(
    //     @Param('owner_id') owner_id: string,
    //     @Body()
    //     Body: {
    //         name: string;
    //         information: {
    //             id: number;
    //             password: string;
    //             store_address: string;
    //             store_operating_time: string;
    //             store_phone: string;
    //             facilities: string;
    //             name: string;
    //             email: string;
    //             phone: string;
    //             store_name: string;
    //             photo: string[];
    //             facility: string;
    //             theme: 'cute' | 'modern' | 'vintage' | 'simple';
    //         };
    //         menu: [
    //             {
    //                 category_name: string;
    //                 owner_id: number;
    //                 menus: [
    //                     {
    //                         name: string;
    //                         image_url: string;
    //                         price: number;
    //                         menu_id: number;
    //                     },
    //                 ];
    //             },
    //         ];
    //     },
    // ) {
    //     this.ownerService.update(+owner_id, Body.information);
    //     for (let index = 0; index < Body.menu.length; index++) {
    //         this.menuService.removeAllByOwnerId(Body.menu[index].owner_id);
    //     }
    //     for (let index = 0; index < Body.menu.length; index++) {
    //         for (let i = 0; i < Body.menu[index].menus.length; i++) {
    //             this.menuItemService.removeAllByOwnerId(
    //                 Body.menu[index].menus[i].menu_id,
    //             );
    //         }
    //     }
    //     for (let index = 0; index < Body.menu.length; index++) {
    //         this.menuService.createAt(
    //             Body.menu[index].category_name,
    //             Body.menu[index].owner_id,
    //         );
    //     }
    //     for (let index = 0; index < Body.menu.length; index++) {
    //         for (let i = 0; i < Body.menu[index].menus.length; i++) {
    //             this.menuItemService.create(Body.menu[index].menus[i]);
    //         }
    //     }
    //     return;
    // }

    @Get(':owner_id')
    findOne(@Param('owner_id', ParseIntPipe) owner_id: number): Promise<Owner> {
        console.log(owner_id);
        console.log();
        return this.ownerService.findByOwnerId(owner_id);
    }

    @Patch(':owner_id')
    @ApiParam({
        name: 'owner_id',
        description: '사장님 아이디',
    })
    @ApiOperation({
        summary: '사장님 정보 최신화',
        description: '사장님 정보 업데이트',
    })
    update(
        @Param('owner_id') owner_id: string,
        @Body() updateOwnerDto: UpdateOwnerDto,
    ) {
        return this.ownerService.update(+owner_id, updateOwnerDto);
    }


    @Patch(':owner_id/all')
    @ApiParam({
        name: 'owner_id',
        description: '사장님 아이디',
    })
    @ApiOperation({
        summary: '사장님 전체 정보 갱신',
    })
    updateAll(
        @Param('owner_id') owner_id: string,
        @Body() updateOwnerDto: UpdateOwnerAllDto,
    ) {
        return this.ownerService.updateAll(+owner_id, updateOwnerDto);
    }


    @Delete(':store_name')
    remove(@Param('store_name') store_name: string) {
        return this.ownerService.remove(store_name);
    }
}
