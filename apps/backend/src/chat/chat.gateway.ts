import { MessageDto, UserDto, UserJoinDto, UserOnlineOfflineDto, UsersOnlineDto } from '@cha-cha-chat/dto';
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
import { MessageService } from 'src/message/message.service';
import { UserService } from '../user/user.service';

/**
 * Websocket gateway for the chat.
 */
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly online = new Set<string>();

  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
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
    }

    this.online.add(username);

    // Inform all this user is online
    const userOnline: UserOnlineOfflineDto = { username: username };
    client.broadcast.emit(SocketEvent.USER_ONLINE, userOnline);

    // Inform client of all online users
    const usersOnline: UsersOnlineDto = { usernames: [...this.online].filter((user) => user != username) };
    client.emit(SocketEvent.USERS_ONLINE, usersOnline);
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

    client.broadcast.emit(SocketEvent.MESSAGE_RECEIVE, message);
    client.emit(SocketEvent.MESSAGE_RECEIVE, message);
  }

  /**
   * Handles when a user joins the chat.
   */
  @SubscribeMessage(SocketEvent.USER_JOIN)
  handleUserJoin(@MessageBody() user: UserJoinDto, @ConnectedSocket() client: Socket) {
    if (!user) return;
    if (!user.username) return;

    client.broadcast.emit(SocketEvent.USER_JOIN, user);
  }
}
