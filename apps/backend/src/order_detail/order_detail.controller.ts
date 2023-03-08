import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('order-detail')
@ApiTags('주문 내역')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post()
  @ApiOperation({
    summary: '주문 내역 생성 API',
  })
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailService.create(createOrderDetailDto);
  }

  @Get()
  @ApiOperation({
    summary: '주문 내역 전체 조회 API',
  })
  findAll() {
    return this.orderDetailService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '주문 내역 단일 조회 API',
  })
  findOne(@Param('id') id: string) {
    return this.orderDetailService.findOne(id);
  }

  @Get('/user/:user_id')
  @ApiOperation({
    summary: '해당 사용자의 주문 내역 조회 API',
  })
  findManyByUser(@Param('user_id') user_id: string) {
    return this.orderDetailService.findByUser(user_id);
  }

  @Get('/owner/:owner_id')
  @ApiOperation({
    summary: '해당 사장님의 주문 내역 조회 API',
  })
  findManyByOwner(@Param('owner_id') owner_id: string) {
    return this.orderDetailService.findByOwner(+owner_id);
  }

  @Get('/owner/:owner_id/table_order')
  @ApiOperation({
    summary: '해당 사장님의 주문 내역을 테이블 별로 묶어서 조회합니다 API',
  })
  findManyTablesByOwner(@Param('owner_id') owner_id: string) {
    return this.orderDetailService.findManyTablesByOwner(+owner_id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '해당 주문 내역 업데이트 API',
  })
  update(@Param('id') id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailService.update(id, updateOrderDetailDto);
  }

  @Patch('/:id/toss-status')
  @ApiOperation({
    summary: '해당 주문 내역 토스 상태 변경  API',
  })
  updateTossStatus(@Param('id') id: string, @Query('status') tossStatus: string) {
    return this.orderDetailService.updateTossStatus(id, tossStatus);
  }

  @Patch('/:id/order-status')
  @ApiOperation({
    summary: '해당 주문 내역 주문 상태 변경 API',
  })
  updateOrderStatus(@Param('id') id: string, @Query('status') orderStatus: string) {
    return this.orderDetailService.updateOrderStatus(id, orderStatus);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '해당 주문 내역 삭제 API',
  })
  remove(@Param('id') id: string) {
    return this.orderDetailService.remove(id);
  }
}
