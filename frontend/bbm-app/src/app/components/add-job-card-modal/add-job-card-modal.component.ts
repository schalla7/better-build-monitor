// add-job-card-modal.component.ts
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IJobCard } from '../../interfaces/jobcard.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { addJobCard } from '../../store/jobs/jobs.actions';
import { UniqueTitleValidator } from '../../validators/unique-title-validator';

@Component({
  selector: 'app-add-job-card-modal',
  templateUrl: './add-job-card-modal.component.html',
  styleUrls: ['./add-job-card-modal.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
  ]
})
export class AddJobCardModalComponent {
  jobCardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private uniqueTitleValidator: UniqueTitleValidator,
  ) {
    this.jobCardForm = this.fb.group({
      label_title: ['',
        [Validators.required], 
        [this.uniqueTitleValidator.validateTitle()]
      ],
      label_description: [''], // Description - optional
      host: ['http://defaultHost.com', Validators.required], // Host - prepopulated with default value
      jobname: ['', Validators.required], // Job Name
      joburl: ['', Validators.required] // Job URL
    });

    // Listen for changes on the host or jobname fields and update the joburl field
    this.jobCardForm.get('host')!.valueChanges.subscribe(value => this.updateJobURL());
    this.jobCardForm.get('jobname')!.valueChanges.subscribe(value => this.updateJobURL());
  }

  get jobURL(): string {
    const host = this.jobCardForm.get('host')!.value;
    const jobname = this.jobCardForm.get('jobname')!.value;
    return `${host}/${jobname}`;
  }

  private updateJobURL(): void {
    const jobURL = this.jobURL;
    this.jobCardForm.patchValue({ joburl: jobURL });
  }

  onSubmit() {
    if (this.jobCardForm.valid) {
      console.log(this.jobCardForm.value);
      const newJobCard: IJobCard = this.prepareNewJobCardData(this.jobCardForm.value);
      this.store.dispatch(addJobCard({ jobCard: newJobCard })); // Dispatch the action
    }
  }

  private prepareNewJobCardData(formValue: any): IJobCard {
    // Map the form values to the IJobCard structure
    // You might also want to include any additional default values or generated data like timestamps
    return {
      id: Date.now(), // Generating a unique ID based on the current timestamp (as an example)
      label_title: formValue.label_title,
      label_description: formValue.label_description,
      source_link: {
        host: formValue.host,
        jobname: formValue.jobname,
        joburl: formValue.host + "/" + formValue.jobname,
      }
    };
  }
}
