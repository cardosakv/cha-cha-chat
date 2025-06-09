import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { UserService } from '../user/user.service';
import { MessageService } from '../message/message.service';
import { ChatEventDto } from '@cha-cha-chat/dto';
import { Message, User } from 'generated/prisma';

type Mock<T> = {
  [P in keyof T]?: jest.Mock;
};

describe('ChatService', () => {
  let chatService: ChatService;

  const messageServiceMock: Mock<MessageService> = {
    getRecent: jest.fn(),
  };

  const userServiceMock: Mock<UserService> = {
    getJoinedWithin: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: MessageService,
          useValue: messageServiceMock,
        },
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    chatService = module.get<ChatService>(ChatService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(chatService).toBeDefined();
  });

  it('should get feed (messages only)', async () => {
    const limit = 3;

    const users: User[] = [];

    const messages: Message[] = [
      {
        messageId: 3,
        username: 'arnold',
        content: 'hello',
        timestamp: new Date(1620000000100),
        attachmentId: null,
      },
      {
        messageId: 2,
        username: 'nika',
        content: 'hi',
        timestamp: new Date(1620000000050),
        attachmentId: null,
      },
      {
        messageId: 1,
        username: 'arnold',
        content: 'welcome',
        timestamp: new Date(1620000000000),
        attachmentId: null,
      },
    ];

    const feed: ChatEventDto[] = [
      {
        type: 'message',
        data: {
          id: 3,
          username: 'arnold',
          content: 'hello',
          timestamp: 1620000000100,
          attachment: '',
        },
      },
      {
        type: 'message',
        data: {
          id: 2,
          username: 'nika',
          content: 'hi',
          timestamp: 1620000000050,
          attachment: '',
        },
      },
      {
        type: 'message',
        data: {
          id: 1,
          username: 'arnold',
          content: 'welcome',
          timestamp: 1620000000000,
          attachment: '',
        },
      },
    ];

    messageServiceMock.getRecent?.mockResolvedValue(messages);
    userServiceMock.getJoinedWithin?.mockResolvedValue(users);

    const result = await chatService.getFeed(limit);

    expect(messageServiceMock.getRecent).toHaveBeenCalledWith(limit, undefined);
    expect(userServiceMock.getJoinedWithin).toHaveBeenCalledWith(1620000000000, 1620000000100);
    expect(result).toEqual(feed);
  });

  it('should get feed (joined users only)', async () => {
    const limit = 3;

    const users: User[] = [
      {
        username: 'juan',
        joinedAt: new Date(1620000000100),
      },
      {
        username: 'maria',
        joinedAt: new Date(1620000000050),
      },
    ];

    const messages: Message[] = [];

    const feed: ChatEventDto[] = [];

    messageServiceMock.getRecent?.mockResolvedValue(messages);
    userServiceMock.getJoinedWithin?.mockResolvedValue(users);

    const result = await chatService.getFeed(limit);

    expect(messageServiceMock.getRecent).toHaveBeenCalledWith(limit, undefined);
    expect(userServiceMock.getJoinedWithin).toHaveBeenCalledTimes(0);
    expect(result).toEqual(feed);
  });

  it('should get feed (messages + joined users)', async () => {
    const limit = 3;

    const users: User[] = [
      {
        username: 'cruz',
        joinedAt: new Date(1620000000051),
      },
      {
        username: 'rosa',
        joinedAt: new Date(1620000000001),
      },
    ];

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
        content: 'welcome',
        timestamp: new Date(1620000000000),
        attachmentId: null,
      },
    ];

    const feed: ChatEventDto[] = [
      {
        type: 'message',
        data: {
          id: 3,
          username: 'juan',
          content: 'hello',
          timestamp: 1620000000100,
          attachment: '',
        },
      },
      {
        type: 'user-join',
        data: {
          username: 'cruz',
          timestamp: 1620000000051,
        },
      },
      {
        type: 'message',
        data: {
          id: 2,
          username: 'maria',
          content: 'hi',
          timestamp: 1620000000050,
          attachment: '',
        },
      },
      {
        type: 'user-join',
        data: {
          username: 'rosa',
          timestamp: 1620000000001,
        },
      },
      {
        type: 'message',
        data: {
          id: 1,
          username: 'juan',
          content: 'welcome',
          timestamp: 1620000000000,
          attachment: '',
        },
      },
    ];

    messageServiceMock.getRecent?.mockResolvedValue(messages);
    userServiceMock.getJoinedWithin?.mockResolvedValue(users);

    const result = await chatService.getFeed(limit);

    expect(messageServiceMock.getRecent).toHaveBeenCalledWith(limit, undefined);
    expect(userServiceMock.getJoinedWithin).toHaveBeenCalledWith(1620000000000, 1620000000100);
    expect(result).toEqual(feed);
  });

  it('should get feed with last message id', async () => {
    const limit = 3;
    const lastMessageId = 3;

    const users: User[] = [];

    const messages: Message[] = [
      {
        messageId: 6,
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
        messageId: 4,
        username: 'juan',
        content: 'welcome',
        timestamp: new Date(1620000000000),
        attachmentId: null,
      },
    ];

    const feed: ChatEventDto[] = [
      {
        type: 'message',
        data: {
          id: 6,
          username: 'juan',
          content: 'hello',
          timestamp: 1620000000100,
          attachment: '',
        },
      },
      {
        type: 'message',
        data: {
          id: 5,
          username: 'maria',
          content: 'hi',
          timestamp: 1620000000050,
          attachment: '',
        },
      },
      {
        type: 'message',
        data: {
          id: 4,
          username: 'juan',
          content: 'welcome',
          timestamp: 1620000000000,
          attachment: '',
        },
      },
    ];

    messageServiceMock.getRecent?.mockResolvedValue(messages);
    userServiceMock.getJoinedWithin?.mockResolvedValue(users);

    const result = await chatService.getFeed(limit, lastMessageId);

    expect(messageServiceMock.getRecent).toHaveBeenCalledWith(limit, lastMessageId);
    expect(userServiceMock.getJoinedWithin).toHaveBeenCalledWith(1620000000000, 1620000000100);
    expect(result).toEqual(feed);
  });
});
