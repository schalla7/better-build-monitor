import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IJobCard } from '../interfaces/jobcard.interface';

import { Observable, of } from 'rxjs';

// import { JobCard } from '../store/jobs/jobcard.interface';
// import { ViewConfig } from '../store/models/viewConfig.interface';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  mock = true;

  constructor() {}

  getApiJobCardsData(): Observable<IJobCard[]> {

    // Mock list of job cards
    const mockJobCards: IJobCard[] = [
      {
        id: 1,
        label_title: "Job A",
        label_description: "This is the first job",
        source_link: {
          host: "jenkins.example.com",
          jobname: "Job-A",
          joburl: "https://jenkins.example.com/job/Job-A"
        },
        job: { active: true },
        build: {
          build_number: 101,
          running_status: "completed",
          completion_result: "green",
          start_time: "2023-09-01T10:00:00Z",
          end_time: "2023-09-01T10:15:00Z"
        },
        view: { gridpos: 1, group_label: "Group 1" },
        stats: {
          last_red_days_ago: 0,
          consecutive_successes: 5,
          last_green_days_ago: 0,
          consecutive_failures: 0
        }
      },
      {
        id: 2,
        label_title: "Job B",
        label_description: "This is the second job",
        source_link: {
          host: "jenkins.example.com",
          jobname: "Job-B",
          joburl: "https://jenkins.example.com/job/Job-B"
        },
        job: { active: true },
        build: {
          build_number: 102,
          running_status: "busy_running",
          start_time: "2023-09-02T11:00:00Z",
        },
        view: { gridpos: 2, group_label: "Group 1" },
        stats: {
          last_red_days_ago: 1,
          consecutive_successes: 0,
          last_green_days_ago: 5,
          consecutive_failures: 2
        }
      },
      // Add more mock job cards as per the pattern above.
      // ...
    ];
    return of(mockJobCards);
    // if (this.mock) {
    //   return of(mockJobCards);
    // }

    // else {
    //   return this.http.get<IJobCard[]>('/api/build-jobs')
    //     .pipe(
    //       map(response => {
    //         // Preprocess or validate data here if necessary
    //         return response;
    //       })
    //     );
    // }
  }

  // getApiViewConfigData(): Observable<ViewConfig> {
  //   return this.http.get<ViewConfig>('/api/viewconfig')
  //     .pipe(
  //       map(response => {
  //         // Preprocess or validate data here if necessary
  //         return response;
  //       })
  //     );
  // }
}
