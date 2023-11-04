import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { ExcelQueue } from './excel.queue';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './student/studentEntity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'rapidDB',
      entities: [StudentEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([StudentEntity]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'excel-queue',
    }),
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService, ExcelQueue],
})
export class AppModule {}
