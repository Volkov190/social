import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field((type) => Int)
  id: number;

  @Field()
  text: string;

  @Field((type) => Int)
  fromUserId: number;

  @Field((type) => Int)
  toUserId: number;
}
