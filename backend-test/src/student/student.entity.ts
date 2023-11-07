import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Student {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  dob: Date;

  @Field()
  email: string;
}
