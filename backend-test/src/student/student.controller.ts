import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StudentServie } from './student.service';
import { StudentEntity } from './studentEntity';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentServie) {}

  @Get()
  getAllStudents(): Promise<StudentEntity[]> {
    return this.studentService.getAllStudents();
  }

  @Post('addStudent')
  addStudent(@Body() studentData: Promise<StudentEntity>) {
    return this.studentService.addStudent(studentData);
  }

  @Delete('deleteStudent/:id')
  async deleteStudent(@Param() deleteData: { id: number }): Promise<void> {
    const { id } = deleteData;
    await this.studentService.deleteStudentById({ id });
  }
}
