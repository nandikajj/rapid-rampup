import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as excel from 'exceljs';

@Processor('excel-queue')
export class ExcelQueue {
  @Process('process-excel')
  async handleProcessExcel(job: Job) {
    const fileBuffer = job.data.fileBuffer;
    const workbook = new excel.Workbook();
    await workbook.xlsx.load(fileBuffer);

    const worksheet = workbook.getWorksheet(1);

    const rows = [];

    worksheet.eachRow((row, rowNumber) => {
      const rowData = row.values;
      rows.push(rowData);
    });

    return rows;
  }
}
