import { ApiProperty } from '@nestjs/swagger';
import { CreateMenuAllDto } from 'src/menu/dto/create-menu-all.dto';
import { MenuEntity } from 'src/menu/entities/menu.entity';
export class UpdateOwnerAllDto {
    @ApiProperty()
    password: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    store_phone: string;
    @ApiProperty()
    store_address: string;
    @ApiProperty()
    store_operating_time: string;
    @ApiProperty()
    store_name: string;
    @ApiProperty()
    theme?: string;
    @ApiProperty()
    photo: string[];
    @ApiProperty()
    facility?: string;

    @ApiProperty({ type: [MenuEntity] })
    menu: MenuEntity[];

}
