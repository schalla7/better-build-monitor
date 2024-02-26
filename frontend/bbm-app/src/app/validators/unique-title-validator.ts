import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime, take, switchMap } from 'rxjs/operators';
import { JobCardsService } from '../services/job-cards.service';

@Injectable({ providedIn: 'root' })
export class UniqueTitleValidator {
  constructor(private jobCardsService: JobCardsService) {}

  validateTitle(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null); // if control is empty return no error
      }
      return control.valueChanges.pipe(
        debounceTime(500), // Debounce the input to avoid spamming the server
        take(1), // Ensure the observable completes
        switchMap(value =>
          this.jobCardsService.isTitleUnique(value).pipe(
            map(isUnique => (isUnique ? null : { titleNotUnique: true })),
            catchError(() => of(null)) // Handle the error, possibly returning a validation error
          )
        )
      );
    };
  }
}
