import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentServie } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './studentEntity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],

  controllers: [StudentController],
  providers: [StudentServie],
})
export class StudentModule {}
