import { MessageDto } from '@cha-cha-chat/dto';
import { SocketEvents } from '@cha-cha-chat/types';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import cookie from 'cookie';
import { Socket } from 'socket.io';

/**
 * Websocket gateway for the chat.
 */
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly online = new Set<string>();

  /**
   * Handles when user connects to the chat.
   */
  handleConnection(client: Socket) {
    const cookieRaw = client.handshake.headers.cookie;

    if (!cookieRaw) return client.disconnect();

    const cookieJson = cookie.parse(cookieRaw);
    const username = cookieJson.username;

    if (!username) return client.disconnect();

    this.online.add(username);

    // Inform all this user is online
    client.broadcast.emit(SocketEvents.USERS_ONLINE, { user: username });

    // Inform client of all online users
    client.emit(SocketEvents.USER_ONLINE, { users: this.online });
  }

  /**
   * Handles when user disconnects to the chat.
   */
  handleDisconnect(client: Socket) {
    const cookieRaw = client.handshake.headers.cookie;

    if (!cookieRaw) return;

    const cookieJson = cookie.parse(cookieRaw);
    const username = cookieJson.username;

    if (!username) return;

    this.online.delete(username);

    // Inform all this user is offline
    client.broadcast.emit(SocketEvents.USER_OFFLINE, { user: username });
  }

  /**
   * Handles when user sends a message in the chat.
   */
  @SubscribeMessage(SocketEvents.MESSAGE_SEND)
  handleMessage(@MessageBody() message: MessageDto, @ConnectedSocket() client: Socket) {
    if (!message.content && !message.attachment) return;

    client.emit(SocketEvents.MESSAGE_RECEIVE, message);
  }
}
