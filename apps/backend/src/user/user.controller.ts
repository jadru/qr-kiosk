import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            createUserDto.password = await bcrypt.hash(
                createUserDto.password,
                10,
            );
            return this.userService.create(createUserDto);
        } catch (error) {
            throw new HttpException(
                { message: '이미 등록된 사용자입니다.' },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get()
    @ApiOperation({
        summary: '유저 전체 조회 API',
        description: '유저 전체 조회한다.',
    })
    findAll() {
        return this.userService.findAll();
    }

    @Get(':username')
    @ApiOperation({ summary: '유저 조회 API', description: '유저 조회한다.' })
    findOne(@Param('username') username: string) {
        return this.userService.findOneByUsername(username);
    }

    @Patch(':username')
    @ApiOperation({ summary: '유저 수정 API', description: '유저 수정.' })
    update(
        @Param('username') username: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.userService.update(username, updateUserDto);
    }

    @Delete(':username')
    @ApiOperation({ summary: '유저 삭제 API', description: '유저 삭제.' })
    remove(@Param('username') username: string) {
        return this.userService.remove(username);
    }
}
