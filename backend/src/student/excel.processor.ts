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

    console.log('Processed data', data);
  }
}
