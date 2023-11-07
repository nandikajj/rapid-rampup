import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentServie } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './studentEntity';
import { StudentResolver } from './student.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],

  controllers: [StudentController],
  providers: [StudentServie, StudentResolver],
})
export class StudentModule {}
