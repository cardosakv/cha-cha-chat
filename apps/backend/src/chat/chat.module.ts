import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { UserModule } from '../user/user.module';
import { MessageModule } from '../message/message.module';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [UserModule, MessageModule],
})
export class ChatModule {}
