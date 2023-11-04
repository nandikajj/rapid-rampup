import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentServie } from './student/student.service';
const ExcelJS = require('exceljs');

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const processedData = await this.appService.processExcelFile(file.buffer);

    const byteData = processedData.data.fileBuffer;
    const buffer = Buffer.from(new Uint8Array(byteData));
    const workbook = new ExcelJS.Workbook();

    let xcelstudents = [];

    const t = workbook.xlsx
      .load(buffer)
      .then(function () {
        const worksheet = workbook.getWorksheet(1);
        worksheet.eachRow(function (row, rowNumber) {
          // Access cell values in the row

          let cellArray = [];

          row.eachCell(function (cell, colNumber) {
            // console.log(`Row ${rowNumber}, Column ${colNumber}: ${cell.value}`);
            cellArray.push(cell.value);
          });

          xcelstudents.push(cellArray);
        });

        console.log('inside workbook');
        console.log(xcelstudents);
        return xcelstudents;
      })
      .catch(function (error) {
        console.error(error);
      });

    //end of delete code between

    // return {
    //   message: 'File uploaded and processed successfully!',
    //   data: processedData.data.fileBuffer,
    // };

    t.then((c) => {
      this.appService.addAllStudents(c);
    });

    return processedData.data.fileBuffer;
  }
}
