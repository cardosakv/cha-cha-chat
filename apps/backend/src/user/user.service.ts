import { UserDto } from '@cha-cha-chat/dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserDto) {
    return await this.prisma.user.create({
      data: {
        username: user.username,
        joinedAt: new Date(user.joinedAt),
      },
    });
  }

  async exists(username: string) {
    return (
      (await this.prisma.user.count({
        where: {
          username: username,
        },
      })) > 0
    );
  }

  async getJoinedWithin(startTimestamp: number, endTimestamp: number) {
    return await this.prisma.user.findMany({
      where: {
        joinedAt: {
          gte: new Date(startTimestamp),
          lte: new Date(endTimestamp),
        },
      },
    });
  }
}
