import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsPaneComponent } from './jobs-pane.component';

describe('JobsPaneComponent', () => {
  let component: JobsPaneComponent;
  let fixture: ComponentFixture<JobsPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsPaneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobsPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
