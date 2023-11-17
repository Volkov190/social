import { Field, InputType } from '@nestjs/graphql';
import { Gender } from '@prisma/client';

@InputType()
export class InputUser {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  birthdate: Date;

  @Field((type) => Gender)
  gender: Gender;
}
