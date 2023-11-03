import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
const ExcelJS = require('exceljs');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const processedData = await this.appService.processExcelFile(file.buffer);
    console.log(processedData.data);

    //delete code between

    const byteData = processedData.data.fileBuffer;
    const buffer = Buffer.from(new Uint8Array(byteData));
    const workbook = new ExcelJS.Workbook();

    workbook.xlsx
      .load(buffer)
      .then(function () {
        const worksheet = workbook.getWorksheet(1);
        worksheet.eachRow(function (row, rowNumber) {
          // Access cell values in the row
          row.eachCell(function (cell, colNumber) {
            console.log(`Row ${rowNumber}, Column ${colNumber}: ${cell.value}`);
          });
        });
      })
      .catch(function (error) {
        console.error(error);
      });

    //end of delete code between

    // return {
    //   message: 'File uploaded and processed successfully!',
    //   data: processedData.data.fileBuffer,
    // };

    return processedData.data.fileBuffer;
  }
}
