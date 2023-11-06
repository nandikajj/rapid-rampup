import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getAllStudents() {
    return this.http.get('http://localhost:3000/students');
  }

  addStudent(student: any) {
    return this.http.post('http://localhost:3000/students/addStudent', student);
  }

  getStudentById(id: number) {
    return this.http.get(`http://localhost:3000/students/${id}`);
  }

  editStudentById(id: number, studentData: any) {
    return this.http.put(
      `http://localhost:3000/students/updateStudent/${id}`,
      studentData
    );
  }
}
