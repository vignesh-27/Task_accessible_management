import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { taskReducer } from './store/reducers/task.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { TaskEffects } from './store/effects/task.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      task: taskReducer,
    }),
    provideEffects(TaskEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(), // disable in prod
      autoPause: true,
    }),
  ],
};
