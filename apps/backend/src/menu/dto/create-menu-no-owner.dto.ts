import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuNoOwnerDto {
    @ApiProperty()
    category_name: string;
}
