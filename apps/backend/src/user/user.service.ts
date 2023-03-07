import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  
  create(createUserDto: CreateUserDto) : Promise<User> {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOneByUsername(username : string) {
    return this.prisma.user.findFirst({ where : { username }})
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where : { username }, data : updateUserDto });
  }

  remove(username: string) {
    return this.prisma.user.delete({ where : { username }});
  }
}
