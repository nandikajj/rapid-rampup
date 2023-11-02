import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExcelProcessor } from './student/excel.processor';
// import { BullAdapter } from 'nest-bull';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useLogger(['verbose']);
  // app.useBull(new BullAdapter());

  await app.listen(3000);
}
bootstrap();
