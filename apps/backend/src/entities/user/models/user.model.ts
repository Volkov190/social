import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Gender } from '@prisma/client';

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  birthdate: Date;

  @Field()
  gender: Gender;

  @Field((type) => [User])
  friends: User[];
}
