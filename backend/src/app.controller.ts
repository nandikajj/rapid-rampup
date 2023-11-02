import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectQueue('excel-queue') private readonly excelQueue: Queue,
  ) {}

  @Get()
  getHello(): string {
    return 'hi from app';
  }

  @Post('process')
  @UseInterceptors(FileInterceptor('file'))
  async processExcel(@UploadedFile() file) {
    await this.excelQueue.add('process-excel', { filePath: file.path });
    return 'Processing Excel data...';
  }
}
