import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OwnerService {
    constructor(private prisma: PrismaService) {}

    create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
        return this.prisma.owner.create({ data: createOwnerDto });
    }

    findAll() {
        return this.prisma.owner.findMany();
    }
    findOne(id: number) {
        return `This action returns a #${id} owner`;
    }

    update(store_name: string, updateOwnerDto: UpdateOwnerDto) {
        return this.prisma.owner.update({
            where: { store_name },
            data: updateOwnerDto,
        });
    }

    remove(id: number) {
        return `This action removes a #${id} owner`;
    }
}
