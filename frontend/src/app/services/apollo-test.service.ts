import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApolloTestService {
  constructor(private apollo: Apollo) {}

  getStudents(): Observable<any> {
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
}
