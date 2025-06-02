import { ChatEventDto, GetFeedDto, MessageDto, UserDto, UserOnlineOfflineDto, UsersOnlineDto } from '@cha-cha-chat/dto';
import { SocketEvent } from '@cha-cha-chat/types';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessageService } from '../message/message.service';
import { UserService } from '../user/user.service';
import { MESSAGE_FEED_LIMIT } from '../utils/constants';
import { ChatService } from './chat.service';

/**
 * Websocket gateway for the chat.
 */
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly online = new Set<string>();

  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly chatService: ChatService,
  ) {}

  /**
   * Handles when user connects to the chat.
   */
  async handleConnection(client: Socket) {
    const username = client.handshake.query.username as string;
    if (!username) return client.disconnect();

    const userExists = await this.userService.exists(username);

    if (!userExists) {
      const user: UserDto = {
        username: username,
        joinedAt: Date.now(),
      };

      const createdUser = await this.userService.create(user);
      if (!createdUser) return client.disconnect();

      const userJoinChatEvent: ChatEventDto = {
        type: 'user-join',
        data: {
          username: user.username,
          timestamp: user.joinedAt,
        },
      };

      client.broadcast.emit(SocketEvent.USER_JOIN, userJoinChatEvent);
    }

    this.online.add(username);

    // Inform all this user is online
    const userOnline: UserOnlineOfflineDto = { username: username };
    client.broadcast.emit(SocketEvent.USER_ONLINE, userOnline);

    // Inform client of all online users
    const usersOnline: UsersOnlineDto = { usernames: [...this.online].filter((user) => user != username) };
    client.emit(SocketEvent.USERS_ONLINE, usersOnline);

    // Get chat feed
    const recentChatFeed = await this.chatService.getFeed(MESSAGE_FEED_LIMIT);
    client.emit(SocketEvent.FEED_RECEIVE, recentChatFeed);
  }

  /**
   * Handles when user disconnects to the chat.
   */
  handleDisconnect(client: Socket) {
    const username = client.handshake.query.username as string;
    if (!username) return client.disconnect();

    this.online.delete(username);

    // Inform all this user is offline
    const userOffline: UserOnlineOfflineDto = { username: username };
    client.broadcast.emit(SocketEvent.USER_OFFLINE, userOffline);
  }

  /**
   * Handles when user sends a message in the chat.
   */
  @SubscribeMessage(SocketEvent.MESSAGE_SEND)
  async handleMessage(@MessageBody() message: MessageDto, @ConnectedSocket() client: Socket) {
    if (!message.content && !message.attachment) return;

    const createdMessage = await this.messageService.create(message);
    if (!createdMessage) return;

    const messageChatEvent: ChatEventDto = {
      type: 'message',
      data: {
        id: createdMessage.messageId,
        username: message.username,
        content: message.content,
        attachment: message.attachment ?? '',
        timestamp: message.timestamp,
      },
    };

    client.broadcast.emit(SocketEvent.MESSAGE_RECEIVE, messageChatEvent);
    client.emit(SocketEvent.MESSAGE_RECEIVE, messageChatEvent);
  }

  /**
   * Handles retrieval of new messages in chat.
   */
  @SubscribeMessage(SocketEvent.FEED_GET)
  async handleGetFeed(@MessageBody() query: GetFeedDto, @ConnectedSocket() client: Socket) {
    const chatFeed = await this.chatService.getFeed(MESSAGE_FEED_LIMIT, query.lastMessageId);
    client.emit(SocketEvent.FEED_RECEIVE, chatFeed);
  }
}
