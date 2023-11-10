import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestApolloComponent } from './test-apollo.component';

describe('TestApolloComponent', () => {
  let component: TestApolloComponent;
  let fixture: ComponentFixture<TestApolloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestApolloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestApolloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
