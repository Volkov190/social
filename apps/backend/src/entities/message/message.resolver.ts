import { Inject } from '@nestjs/common';
import {
  Args,
  Context,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { MessageService } from './message.service';
import { InputMessage } from './models/inputMessage.model';
import { Message } from './models/message.model';

@Resolver((of) => Message)
export class MessageResolver {
  constructor(
    private service: MessageService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Query((returns) => [Message])
  async getMessagesTo(
    @Args('userToId', { type: () => Int }) id: number,
    @Context() context,
  ) {
    const user = context.req.user;
    return this.service.getMessages(user.id, id);
  }

  @Mutation((returns) => Message)
  async addMessage(@Args('message') message: InputMessage, @Context() context) {
    const user = context.req.user;
    return this.service.createMessage(user.id, message);
  }

  @Subscription((returns) => Message, {
    resolve: (value) => value.messageSended,
    filter(payload, _variables, context) {
      return payload.messageSended?.toUserId === context.user?.id;
    },
  })
  messageSended() {
    return this.pubSub.asyncIterator('messageSended');
  }
}
