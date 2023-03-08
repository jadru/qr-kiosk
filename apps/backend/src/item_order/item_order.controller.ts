import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemOrderService } from './item_order.service';
import { CreateItemOrderDto } from './dto/create-item_order.dto';
import { UpdateItemOrderDto } from './dto/update-item_order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('item-order')
@ApiTags('장바구니')
export class ItemOrderController {
  constructor(private readonly itemOrderService: ItemOrderService) {}

  @Post()
  @ApiOperation({ 
    summary: '장바구니 생성 API',
  })
  create(@Body() createItemOrderDto: CreateItemOrderDto) {
    return this.itemOrderService.create(createItemOrderDto);
  }

  @Get()
  @ApiOperation({ 
    summary: '장바구니 전체 조회 API',
  })
  findAll() {
    return this.itemOrderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: '장바구니 단일 조회 API',
  })
  findOne(@Param('id') id: string) {
    return this.itemOrderService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: '장바구니 단일 수정 API',
  })
  update(@Param('id') id: string, @Body() updateItemOrderDto: UpdateItemOrderDto) {
    return this.itemOrderService.update(+id, updateItemOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: '장바구니 단일 삭제 API',
  })
  remove(@Param('id') id: string) {
    return this.itemOrderService.remove(+id);
  }
}
