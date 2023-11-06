import { HttpClient } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css'],
})
export class StudentTableComponent {
  public gridData: any;
  formData = new FormData();

  public opened = false;

  constructor(
    private http: HttpClient,
    private studentService: StudentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.studentService.getAllStudents().subscribe((sub) => {
      console.log(sub);
      this.gridData = sub;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.formData.append('file', file);
    this.notificationService.show({
      content: 'File Added Successfully!',
      hideAfter: 1200,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'slide', duration: 400 },
      type: { style: 'success', icon: true },
    });
  }

  handleUploadExcel() {
    this.http
      .post('http://localhost:3000/upload', this.formData)
      .subscribe((response) => {
        console.log(response);

        window.location.reload();
      });
  }

  handleDeleteStudent(id: number) {
    this.http
      .delete(`http://localhost:3000/students/deleteStudent/${id}`)
      .subscribe((res) => {
        window.location.reload();
      });
  }

  handleEditStudent() {
    console.log('edit btn');
    this.opened = true;
  }

  public close(status: string): void {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
  }
}
