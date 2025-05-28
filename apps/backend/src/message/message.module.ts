import { Module } from '@nestjs/common';
import { AttachmentModule } from './attachment/attachment.module';

@Module({
  imports: [AttachmentModule],
})
export class MessageModule {}
