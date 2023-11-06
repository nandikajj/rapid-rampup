import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent {
  constructor(private studentService: StudentService) {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.studentService.addStudent(form.value).subscribe((sub) => {
      console.log(sub);
    });
  }
}
