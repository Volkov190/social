import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/db/prisma/prisma.module';
import { PubSubModule } from 'src/modules/pubsub.module';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';

@Module({
  imports: [PrismaModule, PubSubModule],
  providers: [MessageResolver, MessageService],
})
export class MessageModule {}
