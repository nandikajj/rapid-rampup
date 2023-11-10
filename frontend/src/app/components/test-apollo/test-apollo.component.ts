import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloTestService } from 'src/app/services/apollo-test.service';

@Component({
  selector: 'app-test-apollo',
  templateUrl: './test-apollo.component.html',
  styleUrls: ['./test-apollo.component.css'],
})
export class TestApolloComponent {
  constructor(
    private apollo: Apollo,
    private apolloTestService: ApolloTestService
  ) {}

  students: any[] = [];

  ngOnInit(): void {
    this.apolloTestService.getStudents().subscribe((sub) => {
      this.students = sub.students;
      console.log(this.students);
    });
  }
}
