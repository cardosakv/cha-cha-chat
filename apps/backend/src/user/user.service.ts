import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'generated/prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: User) {
    return await this.prisma.user.create({
      data: user,
    });
  }

  async exists(username: string) {
    return await this.prisma.user.count({
      where: {
        username: username,
      },
    });
  }
}
