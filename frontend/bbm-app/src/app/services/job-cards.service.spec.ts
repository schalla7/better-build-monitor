import { TestBed } from '@angular/core/testing';

import { JobCardsService } from './job-cards.service';

describe('JobCardsService', () => {
  let service: JobCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
