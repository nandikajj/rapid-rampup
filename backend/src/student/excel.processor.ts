// src/excel.processor.ts
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { AppService } from 'src/app.service';

@Processor('excel-queue')
export class ExcelProcessor {
  constructor(private readonly appService: AppService) {}

  @Process('process-excel')
  async processExcel(job: Job<any>) {
    const { filePath } = job.data;
    const data = await this.appService.readDataFromExcel(filePath);
    // Do something with the data (e.g., save it to a database)
    console.log('Processed Excel data:', data);
  }
}
