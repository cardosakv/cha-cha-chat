import { MessageDto } from '@cha-cha-chat/dto';
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
    const username = client.handshake.query.username as string;
    if (!username) return client.disconnect();

    this.online.add(username);

    // Inform all this user is online
    client.broadcast.emit(SocketEvent.USER_ONLINE, { user: username });

    // Inform client of all online users
    const onlineUsers = [...this.online].filter((user) => user != username);
    client.emit(SocketEvent.USERS_ONLINE, { users: onlineUsers });
  }

  /**
   * Handles when user disconnects to the chat.
   */
  handleDisconnect(client: Socket) {
    const username = client.handshake.query.username as string;
    if (!username) return client.disconnect();

    this.online.delete(username);

    // Inform all this user is offline
    client.broadcast.emit(SocketEvent.USER_OFFLINE, { user: username });
  }

  /**
   * Handles when user sends a message in the chat.
   */
  @SubscribeMessage(SocketEvent.MESSAGE_SEND)
  handleMessage(@MessageBody() message: MessageDto, @ConnectedSocket() client: Socket) {
    if (!message.content && !message.attachment) return;

    client.broadcast.emit(SocketEvent.MESSAGE_RECEIVE, message);
    client.emit(SocketEvent.MESSAGE_RECEIVE, message);
  }
}
