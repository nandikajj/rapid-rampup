import { Controller, Get, Post } from '@nestjs/common';
import { StudentServie } from './student.service';
import { StudentEntity } from './studentEntity';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentServie) {}

  @Get()
  getAllStudents(): Promise<StudentEntity[]> {
    return this.studentService.getAllStudents();
  }
}
