import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class InputMessage {
  @Field()
  text: string;

  @Field((type) => Int)
  toUserId: number;
}
