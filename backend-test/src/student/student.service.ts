import { StudentEntity } from './studentEntity';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
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
}
