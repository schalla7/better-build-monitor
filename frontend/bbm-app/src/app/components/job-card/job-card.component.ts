import { Component, Input } from '@angular/core';
import { IJobCard } from '../../interfaces/jobcard.interface';
import { NgClass, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';

// In job-card.component.ts
@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    DatePipe
  ]
})
export class JobCardComponent {
  @Input() jobCard!: IJobCard;


}
