import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient, private apollo: Apollo) {}

  getAllStudents(): Observable<any> {
    // return this.http.get('http://localhost:3000/students');

    return this.apollo
      .watchQuery({
        query: gql`
          {
            students {
              id
              name
              dob
              email
            }
          }
        `,
      })
      .valueChanges.pipe(map((result) => result.data));
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

  deleteStudentById(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteStudent($id: ID!) {
          deleteStudent(id: $id) {
            id
            name
            dob
            email
          }
        }
      `,
      variables: {
        id: id.toString(),
      },
    });
  }
}
