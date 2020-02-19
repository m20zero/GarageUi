import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardDetailComponent } from './jobcard-detail.component';

describe('UserProfileComponent', () => {
  let component: JobCardDetailComponent;
  let fixture: ComponentFixture<JobCardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCardDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
