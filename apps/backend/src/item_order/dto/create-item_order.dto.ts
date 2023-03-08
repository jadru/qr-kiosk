import { ApiProperty } from "@nestjs/swagger";

export class CreateItemOrderDto {
    @ApiProperty()
    count: number;

    @ApiProperty()
    menu_item_id: number;
}
