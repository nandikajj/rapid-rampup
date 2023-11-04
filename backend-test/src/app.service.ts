import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('excel-queue') private readonly excelQueue: Queue) {}
  myStudents = [];

  async processExcelFile(fileBuffer: Buffer) {
    const processedData = await this.excelQueue.add('process-excel', {
      fileBuffer,
    });

    return processedData;
  }

  addAllStudents(myStudents: any) {
    this.myStudents = [...myStudents];
    console.log(myStudents);
  }

  getAllStudentsFromExcel() {
    return this.myStudents;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
