import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [ChatModule, PrismaModule, MessageModule],
  controllers: [],
})
export class AppModule {}
