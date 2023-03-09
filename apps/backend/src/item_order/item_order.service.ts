import { Injectable } from '@nestjs/common';
import { CreateItemOrderDto } from './dto/create-item_order.dto';
import { UpdateItemOrderDto } from './dto/update-item_order.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ItemOrderService {
  constructor(private prisma: PrismaService) {}

  create(createItemOrderDto: CreateItemOrderDto) {
    return this.prisma.item_Order.create({
      data: createItemOrderDto,
    });
  }

  findAll() {
    return this.prisma.item_Order.findMany();
  }

  findOne(id: number) {
    return this.prisma.item_Order.findUnique({
      where: { id },
    });
  }

  update(id: number, updateItemOrderDto: UpdateItemOrderDto) {
    return this.prisma.item_Order.update({
      where: { id },
      data: updateItemOrderDto,
    });
  }

  remove(id: number) {
    return this.prisma.item_Order.delete({
      where: { id },
    });
  }
}
