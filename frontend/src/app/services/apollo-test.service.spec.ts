import { TestBed } from '@angular/core/testing';

import { ApolloTestService } from './apollo-test.service';

describe('ApolloTestService', () => {
  let service: ApolloTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApolloTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
