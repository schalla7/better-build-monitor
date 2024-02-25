import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobCardModalComponent } from './add-job-card-modal.component';

describe('AddJobCardModalComponent', () => {
  let component: AddJobCardModalComponent;
  let fixture: ComponentFixture<AddJobCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddJobCardModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddJobCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
