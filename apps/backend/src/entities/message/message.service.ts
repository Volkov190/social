import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { InputMessage } from './models/inputMessage.model';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  async getMessages(userId1: number, userId2: number) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { fromUserId: userId1, toUserId: userId2 },
          { fromUserId: userId2, toUserId: userId1 },
        ],
      },
    });
  }

  async createMessage(fromUserId: number, message: InputMessage) {
    const newMessage = await this.prisma.message.create({
      data: { ...message, fromUserId, date: new Date() },
    });
    this.pubSub.publish('messageSended', { messageSended: newMessage });
    return newMessage;
  }
}
