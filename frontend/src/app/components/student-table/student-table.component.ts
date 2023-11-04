import { GridModule } from '@progress/kendo-angular-grid';
import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css'],
})
export class StudentTableComponent {
  public gridData: any;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getAllStudents().subscribe((sub) => {
      console.log(sub);
      this.gridData = sub;
    });
  }
}
