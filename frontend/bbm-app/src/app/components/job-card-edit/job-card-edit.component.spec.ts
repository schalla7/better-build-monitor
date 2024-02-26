import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardEditComponent } from './job-card-edit.component';

describe('JobCardEditComponent', () => {
  let component: JobCardEditComponent;
  let fixture: ComponentFixture<JobCardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobCardEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobCardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
