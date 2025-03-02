import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { PrerenderFallback } from '@angular/ssr';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
      provideRouter(routes),
      provideClientHydration(withEventReplay()), 
      provideHttpClient(withFetch(), withInterceptors([headersInterceptor]))
     ,provideAnimations(),
     provideToastr(),
     importProvidersFrom(NgxSpinnerModule, TranslateModule.forRoot({
      defaultLanguage:"en",
      loader:{
          provide: TranslateLoader,
          useFactory:HttpLoaderFactory,
          deps:[HttpClient]

      }



     })),

     
  ]
};
