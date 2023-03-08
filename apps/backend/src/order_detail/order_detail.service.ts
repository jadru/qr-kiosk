import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Menu } from '@prisma/client';

@Injectable()
export class OrderDetailService {
    constructor(private prisma: PrismaService) {}

    create(createOrderDetailDto: CreateOrderDetailDto) {
        
        return this.prisma.order_Detail.create({
            data: {
                ...createOrderDetailDto,
                item_orders: {
                    create: createOrderDetailDto.item_orders,
                },
            },
            include: { item_orders: true}
        });
    }

    findAll() {
        return this.prisma.order_Detail.findMany({ include: { item_orders: true }});
    }

    findOne(id: string) {
        return this.prisma.order_Detail.findUnique({
            where: { id },
            include: { item_orders: true },
        });
    }

    findByUser(id: string) {
      return this.prisma.order_Detail.findMany({
          where: { user_id: id },
          include: { item_orders: true },
      });
  }

    findByOwner(id: number) {
        return this.prisma.order_Detail.findMany({
            where: { owner_id: id },
            include: { item_orders: true },
        });
    }

    async findManyTablesByOwner(id: number) {
      const orders =  await this.prisma.order_Detail.findMany({
        where: { owner_id: id },
        include: { item_orders: true },
      });

      // orders를 tables_number로 group by 해주는 부분
      const tables = orders.reduce((acc, cur) => {
        if (acc[cur.table_number]) {
          acc[cur.table_number].push(cur);
        } else {
          acc[cur.table_number] = [cur];
        }
        return acc;
      }, {});
      return tables;
  }

    update(id: string, updateOrderDetailDto: UpdateOrderDetailDto) {
        return this.prisma.order_Detail.update({
            where: { id },
            data: {
              ...updateOrderDetailDto,
              item_orders: {
                  create: updateOrderDetailDto.item_orders,
              },
          },
      });
    }

    updateOrderStatus(id: string, status: string) {
        return this.prisma.order_Detail.update({
            where: { id },
            data: { order_status: status },
        });
    }

    updateTossStatus(id: string, status: string) {
        return this.prisma.order_Detail.update({
            where: { id },
            data: { toss_status: status },
        });
    }

    remove(id: string) {
        return this.prisma.order_Detail.delete({
            where: { id },
        });
    }
}
