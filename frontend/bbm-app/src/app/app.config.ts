import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store'; // This should import your combined reducers
import { NgModel } from '@angular/forms';


export const appConfig: ApplicationConfig = {
    providers: [
        NoopAnimationsModule,
        provideRouter(routes),
        provideAnimationsAsync(),
        importProvidersFrom(
            BrowserModule,
             StoreModule.forRoot(reducers),
        ),
        NgModel,
    ]
};
