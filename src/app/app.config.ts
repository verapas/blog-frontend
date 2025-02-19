import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authorizationInterceptor} from './Interceptors/authorisation.interceptor';
import {provideToastr} from 'ngx-toastr';
import {ApiModule, Configuration} from './openapi-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authorizationInterceptor])
    ),
    provideToastr(),
    importProvidersFrom(
      ApiModule.forRoot(() => {
        return new Configuration({
          basePath: 'http://localhost:8080'
        });
      })
    )
  ]
};

