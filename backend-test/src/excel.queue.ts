import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import * as excel from 'exceljs';

@Processor('excel-queue')
export class ExcelQueue {
  constructor(@InjectQueue('excel-queue') private readonly excelQueue) {}

  @Process('process-excel')
  async handleProcessExcel(job: Job) {
    const fileBuffer = job.data.fileBuffer;
    const workbook = new excel.Workbook();
    await workbook.xlsx.load(fileBuffer);

    const worksheet = workbook.getWorksheet(1);

    const rows = [];

    worksheet.eachRow((row, rowNumber) => {
      const rowData = row.values;
      console.log(rowData);
      rows.push(rowData);
    });

    console.log('rows are done in excel queue' + rows);
    return rows;

    //delete below code
  }

  async addProcessExcelJob(data: { fileBuffer: Buffer }) {
    return await this.excelQueue.add('process-excel', data);
  }
}
