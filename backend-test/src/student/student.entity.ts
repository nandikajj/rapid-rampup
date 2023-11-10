import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

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
