import { MessageDto } from '@cha-cha-chat/dto';
import { Injectable } from '@nestjs/common';
import { dataUrlToUint8Array } from '../utils/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(message: MessageDto) {
    return this.prisma.$transaction(async (tx) => {
      let attachmentId: number | null = null;

      if (message.attachment) {
        const parsedData = dataUrlToUint8Array(message.attachment);

        if (parsedData) {
          const attachment = await tx.attachment.create({
            data: { content: parsedData },
          });

          attachmentId = attachment.attachmentId;
        }
      }

      return tx.message.create({
        data: {
          username: message.username,
          content: message.content,
          timestamp: new Date(message.timestamp),
          attachmentId: attachmentId,
        },
      });
    });
  }

  async getRecent(limit: number, lastId?: number) {
    return await this.prisma.message.findMany({
      take: limit,
      ...(lastId
        ? {
            cursor: { messageId: lastId },
            skip: 1,
          }
        : {}),
      orderBy: {
        timestamp: 'desc',
      },
      include: {
        attachment: true,
      },
    });
  }
}
