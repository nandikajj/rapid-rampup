import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('excel-queue') private readonly excelQueue: Queue) {}

  async processExcelFile(fileBuffer: Buffer) {
    const processedData = await this.excelQueue.add('process-excel', {
      fileBuffer,
    });
    return processedData;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
