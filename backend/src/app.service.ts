import { Injectable } from '@nestjs/common';
import * as Excel from 'exceljs';

@Injectable()
export class AppService {
  async readDataFromExcel(filePath: string): Promise<any[]> {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    const data = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        const rowData = {};
        row.eachCell((cell, colNumber) => {
          rowData[`col${colNumber}`] = cell.value;
        });
        data.push(rowData);
      }
    });
    return data;
  }
}
