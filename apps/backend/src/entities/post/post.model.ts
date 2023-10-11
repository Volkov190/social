import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../user/models/user.model';

@ObjectType()
export class Post {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  text: string;

  @Field((type) => User)
  author: User;
}
