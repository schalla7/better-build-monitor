import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobGroupComponent } from './job-group.component';

describe('JobGroupComponent', () => {
  let component: JobGroupComponent;
  let fixture: ComponentFixture<JobGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
