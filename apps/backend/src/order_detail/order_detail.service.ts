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
    return this.prisma.order_Detail.findMany();
  }

  findOne(id: number) {
    return this.prisma.order_Detail.findUnique({
      where: { id },
    });
  }

  findByOwner(id: number) {
    return this.prisma.order_Detail.findMany({
      where: { owner_id: id },
    });
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.prisma.order_Detail.update({
      where: { id },
      data: updateOrderDetailDto,
    });
  }

  updateOrderStatus(id: number, status: string) {
    return this.prisma.order_Detail.update({
      where: { id },
      data: { order_status: status },
    })
  }

  updateTossStatus(id: number, status: string) {
    return this.prisma.order_Detail.update({
      where: { id },
      data: { toss_status: status },
    })
  }

  remove(id: number) {
    return this.prisma.order_Detail.delete({
      where: { id },
    });
  }
}
