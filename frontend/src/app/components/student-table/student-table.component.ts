import { HttpClient } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { NgForm } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css'],
})
export class StudentTableComponent {
  public gridData: any;
  formData = new FormData();

  public opened = false;

  loadEditStudent = {
    id: -1,
    name: '',
    dob: '',
    email: '',
  };

  constructor(
    private http: HttpClient,
    private studentService: StudentService,
    private notificationService: NotificationService,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.studentService.getAllStudents().subscribe((response) => {
      console.log(response);
      console.log('from grid data', response);

      // this.gridData = sub;

      this.gridData = response.students as any[];

      this.gridData = this.gridData.map((student: any) => {
        const birthDate = new Date(student.dob);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();

        // student.dob = student.dob.split('T')[0];
        return { ...student, age, dob: student.dob.split('T')[0] };
      });
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
    // this.http
    //   .delete(`http://localhost:3000/students/deleteStudent/${id}`)
    //   .subscribe((res) => {
    //     alert('student deleted successfully!');
    //     window.location.reload();
    //   });

    this.notificationService.show({
      content: 'Student deleted Successfully!',
      hideAfter: 1200,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'slide', duration: 0 },
      type: { style: 'info', icon: true },
      closable: true,
    });

    this.studentService.deleteStudentById(id).subscribe((res) => {
      console.log('student deleted ', res);
      window.location.reload();
    });
  }

  handleEditStudent(id: number) {
    console.log('edit btn');

    this.studentService.getStudentById(id).subscribe((res: any) => {
      this.loadEditStudent.id = res.id;
      this.loadEditStudent.name = res.name;
      this.loadEditStudent.dob = res.dob.split('T')[0];
      this.loadEditStudent.email = res.email;

      this.opened = true;
    });
  }

  public close(status: string): void {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
  }

  onEditStudent(editForm: NgForm) {
    console.log('click on edit', this.loadEditStudent);
    editForm.value.id = this.loadEditStudent.id;
    if (editForm.value.name == '') {
      editForm.value.name = this.loadEditStudent.name;
    }
    if (editForm.value.dob == '') {
      editForm.value.dob = this.loadEditStudent.dob.split('T')[0];
    }
    if (editForm.value.email == '') {
      editForm.value.email = this.loadEditStudent.email;
    }

    console.log('from updated edit form', editForm.value);

    this.notificationService.show({
      content: 'Student edited Successfully!',
      hideAfter: 1200,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'slide', duration: 0 },
      type: { style: 'info', icon: true },
      closable: true,
    });

    // return this.studentService
    //   .editStudentById(
    //     editForm.value.id,
    //     editForm.value.name,
    //     new Date('2001-02-02'),
    //     editForm.value.email
    //   )
    //   .subscribe((res) => {
    //     console.log('after update' + res);
    //     window.location.reload();
    //   });

    return this.apollo
      .mutate({
        mutation: gql`
          mutation UpdateStudent($updateStudentInput: UpdateStudentInput) {
            updateStudent(updatedStudentData: $updateStudentInput) {
              id
              name
              dob
              email
            }
          }
        `,
        variables: {
          updateStudentInput: {
            id: 182,
            name: 'kaka',
            dob: new Date('2001-02-02'),
            email: 'jsksk',
          },
        },
      })
      .subscribe(
        ({ data, errors }) => {
          if (errors) {
            console.error('GraphQL errors:', errors);
          } else {
            console.log('Updated Student:', data);
          }
        },
        (error) => {
          console.error('HTTP error:', error);
        }
      );
  }
}
