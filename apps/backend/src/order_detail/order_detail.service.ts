import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Menu } from '@prisma/client';

@Injectable()
export class OrderDetailService {
  constructor(private prisma: PrismaService) {}

  create(createOrderDetailDto: CreateOrderDetailDto) {
    return this.prisma.order_Detail.create({ data: createOrderDetailDto });
  }

  findAll() {
    return `This action returns all orderDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderDetail`;
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
