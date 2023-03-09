import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
    @ApiProperty()
    category_name: string;

    @ApiProperty()
    owner_id: number;
}
