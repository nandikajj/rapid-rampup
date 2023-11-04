import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { StudentEntity } from './student/studentEntity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('excel-queue') private readonly excelQueue: Queue,
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}
  myStudents = [];

  async processExcelFile(fileBuffer: Buffer) {
    const processedData = await this.excelQueue.add('process-excel', {
      fileBuffer,
    });

    return processedData;
  }

  async addAllStudents(myStudents: any) {
    this.myStudents = [...myStudents];
    console.log('from app service');
    console.log(myStudents);

    this.myStudents.shift();

    this.myStudents.map(async (student) => {
      console.log(student);
      let insertstudent = {
        name: '',
        age: -1,
        dob: '',
        email: '',
      };
      insertstudent.name = student[0];
      insertstudent.dob = student[1];
      insertstudent.email = student[2];

      console.log(insertstudent);

      const objectDOB = new Date(student[1]).getTime();
      const currentDate = new Date().getTime();

      const age = (currentDate - objectDOB) / (1000 * 60 * 60 * 24 * 365.25);

      insertstudent.age = Math.floor(age);

      return await this.studentRepository.save(insertstudent);
    });
  }

  getAllStudentsFromExcel() {
    return this.myStudents;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
