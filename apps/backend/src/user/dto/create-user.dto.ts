import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    password: string;
}
