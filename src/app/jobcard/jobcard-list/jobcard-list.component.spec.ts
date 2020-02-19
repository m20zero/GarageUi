import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardListComponent } from './jobcard-list.component';

describe('JobCardListComponent', () => {
  let component: JobCardListComponent;
  let fixture: ComponentFixture<JobCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
