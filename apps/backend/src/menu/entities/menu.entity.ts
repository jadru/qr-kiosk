import { ApiProperty } from "@nestjs/swagger";
import { Menu } from "@prisma/client";

export class MenuEntity implements Menu {
    @ApiProperty()
    id: number;

    @ApiProperty()
    category_id: number;

    @ApiProperty()
    category_name: string;

    @ApiProperty()
    owner_id: number;

    @ApiProperty()
    createdTime: Date;
    
    @ApiProperty()
    updatedTime: Date;
}
