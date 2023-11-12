import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { StudentServie } from './student.service';
import { Student } from './student.entity';
import { StudentEntity } from './studentEntity';
import { NotFoundException } from '@nestjs/common';
import { UpdateStudentInput } from './update-student.input';

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

  // @Mutation((returns) => Student)
  // async updateStudent(
  //   @Args('id') id: number,
  //   @Args('updatedStudentData') updatedStudentData: UpdateStudentInput,
  // ): Promise<Student> {
  //   return this.studentService.updateStudent(id, updatedStudentData);
  // }

  // @Mutation((returns) => Student)
  // async updateStudent(
  //   @Args('id') id: number,
  //   @Args('updatedStudentData') updatedStudentData: UpdateStudentInput,
  // ): Promise<StudentEntity> {
  //   try {
  //     const updatedStudent = await this.studentService.updateStudent(
  //       id,
  //       updatedStudentData,
  //     );
  //     return updatedStudent;
  //   } catch (error) {
  //     // Handle errors appropriately, e.g., log them or throw a custom GraphQL error
  //     throw new Error(`Failed to update student: ${error.message}`);
  //   }
  // }

  @Mutation((returns) => Student)
  async updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ): Promise<UpdateStudentInput> {
    return this.studentService.updateStudent(
      updateStudentInput.id,
      updateStudentInput,
    );
  }
}
