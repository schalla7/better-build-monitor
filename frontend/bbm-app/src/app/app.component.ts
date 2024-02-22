import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { HeaderComponent } from './components/header/header.component';
import { NgModel } from '@angular/forms';
import { BackendService } from './services/backend.service';
import { AppState } from './store';
import { Store } from '@ngrx/store';
import { setJobCards } from './store/jobs/jobs.actions';
import { JobsPaneComponent } from './components/jobs-pane/jobs-pane.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DragDropModule,
    
    // My custom components:
    HeaderComponent,
    JobsPaneComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'bbm-app';

  constructor(
    private backendService: BackendService,
    private store: Store<AppState>
  ) { }
  
  ngOnInit(): void {
      this.backendService.getApiJobCardsData().subscribe(jobCards => {
        this.store.dispatch(setJobCards({ jobCards }));
      });

      // this.backendService.getApiViewConfigData().subscribe(viewConfig => {
      //   this.store.dispatch(setViewConfig({ viewConfig }));
      // });
  }
}
