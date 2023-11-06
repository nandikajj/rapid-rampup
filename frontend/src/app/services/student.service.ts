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
}
