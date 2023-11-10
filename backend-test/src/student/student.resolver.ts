import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { StudentServie } from './student.service';
import { Student } from './student.entity';
import { StudentEntity } from './studentEntity';
import { NotFoundException } from '@nestjs/common';

@Resolver((of) => Student)
export class StudentResolver {
  constructor(private studentService: StudentServie) {}

  @Query((returns) => [Student])
  students(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  // @Mutation(() => Student)
  // async deleteStudent(@Args('id') id: number): Promise<Student> {
  //   return this.studentService.deleteStudentById({ id });
  // }

  @Mutation((returns) => Student)
  async deleteStudent(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Student> {
    const student = await this.studentService.deleteStudentById({ id: +id });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  @Mutation(() => Student)
  async updateStudent(
    @Args('id') id: number,
    updatedStudentData: Partial<Student>,
  ): Promise<Student> {
    return this.studentService.updateStudent({ id }, updatedStudentData);
  }
}
