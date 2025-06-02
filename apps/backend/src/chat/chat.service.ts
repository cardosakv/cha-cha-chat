import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';
import { UserService } from '../user/user.service';
import { ChatEventDto, MessageDto, UserJoinDto } from '@cha-cha-chat/dto';
import { uint8ArrayToDataUrl } from 'src/utils/common';

@Injectable()
export class ChatService {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  async getFeed(limit: number, lastMessageId?: number) {
    const chatEvents: ChatEventDto[] = [];

    const messages = await this.messageService.getRecent(limit, lastMessageId);
    if (messages.length == 0) return chatEvents;

    const startTimestamp = messages[messages.length - 1].timestamp.getTime();
    const endTimestamp = messages[0].timestamp.getTime();

    const usersJoinedWithin = await this.userService.getJoinedWithin(startTimestamp, endTimestamp);

    // Aggregate into events to display in chat feed

    messages.forEach((message) => {
      const messageEvent: MessageDto = {
        username: message.username,
        content: message.content ?? '',
        attachment: message.attachment ? uint8ArrayToDataUrl(message.attachment.content) : '',
        timestamp: message.timestamp.getTime(),
      };

      chatEvents.push({ type: 'message', data: messageEvent });
    });

    usersJoinedWithin.forEach((user) => {
      const userJoinEvent: UserJoinDto = {
        username: user.username,
        timestamp: user.joinedAt.getTime(),
      };

      chatEvents.push({ type: 'user-join', data: userJoinEvent });
    });

    // Sort by time in descending order
    chatEvents.sort((a, b) => b.data.timestamp - a.data.timestamp);

    return chatEvents;
  }
}
