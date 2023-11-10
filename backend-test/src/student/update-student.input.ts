import { InputType, Field, Int } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType()
export class UpdateStudentInput {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  dob: Date;

  @Field()
  email: string;
}

// mutation {
//     updateStudent(id:169,updatedStudentData: { id: 169, name: "New Name", dob: "1990-01-01", email: "newemail@example.com" }) {
//       id
//       name
//       dob
//       email
//     }
//   }
