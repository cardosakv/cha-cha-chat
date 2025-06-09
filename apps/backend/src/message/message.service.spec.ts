import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { PrismaService } from '../prisma/prisma.service';
import { MessageDto } from '@cha-cha-chat/dto';
import { Attachment, Message } from 'generated/prisma';

describe('MessageService', () => {
  let service: MessageService;

  const prismaMock = {
    message: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    attachment: {
      create: jest.fn(),
    },
    $transaction: jest.fn(async (callback: any) => {
      return await callback({
        message: {
          create: prismaMock.message.create,
          findMany: prismaMock.message.findMany,
        },
        attachment: {
          create: prismaMock.attachment.create,
        },
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a message (text)', async () => {
    const dto: MessageDto = {
      username: 'juan',
      content: 'test message',
      timestamp: 1620000000000,
    };

    const createdMessage: Message = {
      messageId: 100,
      username: 'juan',
      content: 'test message',
      timestamp: new Date(1620000000000),
      attachmentId: null,
    };

    prismaMock.message.create.mockResolvedValue(createdMessage);
    const result = await service.create(dto);

    expect(prismaMock.message.create).toHaveBeenCalledWith({
      data: {
        username: dto.username,
        content: dto.content,
        timestamp: new Date(dto.timestamp),
        attachmentId: null,
      },
    });

    expect(result).toEqual(createdMessage);
  });

  it('should create a message (image)', async () => {
    const dto: MessageDto = {
      username: 'juan',
      content: '',
      attachment:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAusB9WYZd70AAAAASUVORK5CYII=',
      timestamp: 1620000000000,
    };

    const attachmentId = 1;
    const parsedData = new Uint8Array([
      +137, +80, +78, +71, +13, +10, +26, +10, +0, +0, +0, +13, +73, +72, +68, +82, +0, +0, +0, +1, +0, +0, +0, +1, +8,
      +4, +0, +0, +0, +181, +28, +12, +2, +0, +0, +0, +11, +73, +68, +65, +84, +120, +218, +99, +252, +95, +15, +0, +2,
      +235, +1, +245, +102, +25, +119, +189, +0, +0, +0, +0, +73, +69, +78, +68, +174, +66, +96, +130,
    ]);

    const createdAttachment: Attachment = {
      attachmentId: attachmentId,
      content: parsedData,
    };

    const createdMessage: Message = {
      messageId: 100,
      username: 'juan',
      content: '',
      timestamp: new Date(1620000000000),
      attachmentId: attachmentId,
    };

    prismaMock.attachment.create.mockResolvedValue(createdAttachment);
    prismaMock.message.create.mockResolvedValue(createdMessage);

    const result = await service.create(dto);

    expect(prismaMock.attachment.create).toHaveBeenCalledWith({
      data: { content: parsedData },
    });

    expect(prismaMock.message.create).toHaveBeenCalledWith({
      data: {
        username: dto.username,
        content: dto.content,
        timestamp: new Date(dto.timestamp),
        attachmentId: attachmentId,
      },
    });

    expect(result).toEqual(createdMessage);
  });

  it('should get the recent messages with no last message id', async () => {
    const limit = 3;
    const messages: Message[] = [
      {
        messageId: 3,
        username: 'juan',
        content: 'hello',
        timestamp: new Date(1620000000100),
        attachmentId: null,
      },
      {
        messageId: 2,
        username: 'maria',
        content: 'hi',
        timestamp: new Date(1620000000050),
        attachmentId: null,
      },
      {
        messageId: 1,
        username: 'juan',
        content: 'welcome to the chat',
        timestamp: new Date(1620000000000),
        attachmentId: null,
      },
    ];

    prismaMock.message.findMany.mockResolvedValue(messages);
    const result = await service.getRecent(limit);

    expect(prismaMock.message.findMany).toHaveBeenCalledWith({
      take: limit,
      orderBy: {
        timestamp: 'desc',
      },
      include: {
        attachment: true,
      },
    });

    expect(result).toEqual(messages);
  });

  it('should get the recent messages with a last message id', async () => {
    const limit = 3;
    const lastMessageId = 3;
    const messages: Message[] = [
      {
        messageId: 4,
        username: 'juan',
        content: 'hello',
        timestamp: new Date(1620000000100),
        attachmentId: null,
      },
      {
        messageId: 5,
        username: 'maria',
        content: 'hi',
        timestamp: new Date(1620000000050),
        attachmentId: null,
      },
      {
        messageId: 6,
        username: 'juan',
        content: 'welcome to the chat',
        timestamp: new Date(1620000000000),
        attachmentId: null,
      },
    ];

    prismaMock.message.findMany.mockResolvedValue(messages);
    const result = await service.getRecent(limit, lastMessageId);

    expect(prismaMock.message.findMany).toHaveBeenCalledWith({
      take: limit,
      cursor: {
        messageId: lastMessageId,
      },
      skip: 1,
      orderBy: {
        timestamp: 'desc',
      },
      include: {
        attachment: true,
      },
    });

    expect(result).toEqual(messages);
  });
});
