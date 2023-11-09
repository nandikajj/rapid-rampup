import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentServie } from './student.service';
import { Student } from './student.entity';
import { StudentEntity } from './studentEntity';

@Resolver((of) => Student)
export class StudentResolver {
  constructor(private studentService: StudentServie) {}

  @Query((returns) => [Student])
  students(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Mutation(() => Student)
  async deleteStudent(@Args('id') id: number): Promise<Student> {
    return this.studentService.deleteStudentById({ id });
  }

  @Mutation(() => Student)
  async updateStudent(
    @Args('id') id: number,
    updatedStudentData: Partial<Student>,
  ): Promise<Student> {
    return this.studentService.updateStudent({ id }, updatedStudentData);
  }
}
