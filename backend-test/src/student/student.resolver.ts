import { Resolver, Query } from '@nestjs/graphql';
import { StudentServie } from './student.service';
import { Student } from './student.entity';

@Resolver((of) => Student)
export class StudentResolver {
  constructor(private studentService: StudentServie) {}

  @Query((returns) => [Student])
  students(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }
}
