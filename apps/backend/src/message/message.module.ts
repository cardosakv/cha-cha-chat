import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [MessageService],
  exports: [MessageService],
  imports: [PrismaModule],
})
export class MessageModule {}
