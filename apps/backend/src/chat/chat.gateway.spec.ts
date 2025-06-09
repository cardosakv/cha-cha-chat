import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { MessageService } from '../message/message.service';
import { UserService } from '../user/user.service';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
import { SocketEvent } from '@cha-cha-chat/types';

type Mock<T> = {
  [P in keyof T]?: jest.Mock;
};

describe('ChatGateway', () => {
  let gateway: ChatGateway;

  const messageServiceMock: Mock<MessageService> = {
    create: jest.fn(),
  };

  const userServiceMock: Mock<UserService> = {
    exists: jest.fn(),
    create: jest.fn(),
  };

  const chatServiceMock: Mock<ChatService> = {
    getFeed: jest.fn(),
  };

  const socketMock = {
    handshake: { query: {} },
    disconnect: jest.fn(),
    emit: jest.fn(),
    broadcast: {
      emit: jest.fn(),
    },
  } as any as Socket;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: MessageService,
          useValue: messageServiceMock,
        },
        {
          provide: ChatService,
          useValue: chatServiceMock,
        },
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should disconnect if username is missing on connection', async () => {
    socketMock.handshake.query.username = undefined;

    await gateway.handleConnection(socketMock);

    expect(socketMock.disconnect).toHaveBeenCalled();
  });

  it('should handle connection when user exists', async () => {
    socketMock.handshake.query.username = 'juan';

    userServiceMock.exists?.mockResolvedValue(true);
    chatServiceMock.getFeed?.mockResolvedValue([]);

    await gateway.handleConnection(socketMock);

    expect(userServiceMock.exists).toHaveBeenCalledWith('juan');
    expect(userServiceMock.create).not.toHaveBeenCalled();

    expect(socketMock.broadcast.emit).toHaveBeenCalledWith(SocketEvent.USER_ONLINE, { username: 'juan' });
    expect(socketMock.emit).toHaveBeenCalledWith(SocketEvent.USERS_ONLINE, { usernames: [] });
    expect(chatServiceMock.getFeed).toHaveBeenCalledWith(expect.any(Number));
    expect(socketMock.emit).toHaveBeenCalledWith(SocketEvent.FEED_RECEIVE, []);
  });

  it('should create user and emit user-join event if user does not exist', async () => {
    socketMock.handshake.query.username = 'juan';

    userServiceMock.exists?.mockResolvedValue(false);
    userServiceMock.create?.mockResolvedValue({
      username: 'juan',
      joinedAt: Date.now(),
    });
    chatServiceMock.getFeed?.mockResolvedValue([]);

    await gateway.handleConnection(socketMock);

    expect(userServiceMock.create).toHaveBeenCalledWith({
      username: 'juan',
      joinedAt: expect.any(Number),
    });

    expect(socketMock.broadcast.emit).toHaveBeenCalledWith(
      SocketEvent.USER_JOIN,
      expect.objectContaining({
        type: 'user-join',
        data: expect.objectContaining({ username: 'juan' }),
      }),
    );
  });

  it('should handle disconnect removing user and broadcasting offline event', () => {
    socketMock.handshake.query.username = 'juan';

    // Add user to online set to test removal
    gateway['online'].add('juan');

    gateway.handleDisconnect(socketMock);

    expect(gateway['online'].has('juan')).toBe(false);
    expect(socketMock.broadcast.emit).toHaveBeenCalledWith(SocketEvent.USER_OFFLINE, { username: 'juan' });
  });

  it('handles sending a message and broadcasts it', async () => {
    const message = {
      username: 'juan',
      content: 'hello',
      timestamp: Date.now(),
    };

    const createdMessage = {
      messageId: 1,
      username: 'juan',
      content: 'hello',
      timestamp: new Date(message.timestamp),
      attachment: undefined,
    };

    messageServiceMock.create?.mockResolvedValue(createdMessage);

    await gateway.handleMessage(message, socketMock);

    expect(messageServiceMock.create).toHaveBeenCalledWith(message);
    expect(socketMock.broadcast.emit).toHaveBeenCalledWith(
      SocketEvent.MESSAGE_RECEIVE,
      expect.objectContaining({ type: 'message', data: expect.objectContaining({ id: 1 }) }),
    );
    expect(socketMock.emit).toHaveBeenCalledWith(
      SocketEvent.MESSAGE_RECEIVE,
      expect.objectContaining({ type: 'message', data: expect.objectContaining({ id: 1 }) }),
    );
  });

  it('should not send message if no content or attachment', async () => {
    const emptyMessage = {
      username: 'juan',
      content: '',
      attachment: undefined,
      timestamp: Date.now(),
    };

    await gateway.handleMessage(emptyMessage, socketMock);

    expect(messageServiceMock.create).not.toHaveBeenCalled();
    expect(socketMock.broadcast.emit).not.toHaveBeenCalled();
    expect(socketMock.emit).not.toHaveBeenCalled();
  });

  it('should handle feed retrieval and emit feed', async () => {
    const feed = [{ id: 1, content: 'hello' }];
    chatServiceMock.getFeed?.mockResolvedValue(feed);

    const query = { lastMessageId: 123 };

    await gateway.handleGetFeed(query, socketMock);

    expect(chatServiceMock.getFeed).toHaveBeenCalledWith(expect.any(Number), 123);
    expect(socketMock.emit).toHaveBeenCalledWith(SocketEvent.FEED_RECEIVE, feed);
  });
});
