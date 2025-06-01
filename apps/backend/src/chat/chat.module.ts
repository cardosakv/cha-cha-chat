import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { UserModule } from '../user/user.module';
import { MessageModule } from 'src/message/message.module';

@Module({
  providers: [ChatGateway],
  imports: [UserModule, MessageModule],
})
export class ChatModule {}
