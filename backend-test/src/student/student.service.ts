import { StudentEntity } from './studentEntity';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Repository } from 'typeorm';

@Injectable()
export class StudentServie {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  getAllStudents(): Promise<StudentEntity[]> {
    return this.studentRepository.find();
  }

  addStudent(studentData: any): Promise<StudentEntity> {
    return this.studentRepository.save(studentData);
  }

  async deleteStudentById({ id }: { id: number }): Promise<StudentEntity> {
    const student = await this.studentRepository.findOne({ where: { id } });
    const mystudent = { ...student };
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    await this.studentRepository.remove(student);
    return mystudent;
  }

  async getStudentById({ id }: { id: number }): Promise<StudentEntity> {
    return this.studentRepository.findOne({ where: { id } });
  }

  // async updateStudent(
  //   { id }: { id: number },
  //   updatedStudentData: StudentEntity,
  // ) {
  //   const student = await this.studentRepository.findOne({ where: { id } });

  //   if (!student) {
  //     throw new Error(`Student with ID ${id} not found`);
  //   }

  //   Object.assign(student, updatedStudentData);
  //   return this.studentRepository.save(student);
  // }

  async updateStudent(
    id: number,
    updatedStudentData: StudentEntity,
  ): Promise<StudentEntity> {
    const student = await this.studentRepository.findOne({ where: { id } });

    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }

    Object.assign(student, updatedStudentData);

    return this.studentRepository.save(student);
  }
}
