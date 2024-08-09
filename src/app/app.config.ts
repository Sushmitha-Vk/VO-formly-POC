import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyFieldTabs } from './tabs.type';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormlyFieldExpansionPanel } from './expansion-panel.types';
import { FormlyFieldTable } from './table.types';
import {FormlyMatDatepickerModule} from '@ngx-formly/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleteTypeComponent } from './autocomplete-type.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
 }
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), provideClientHydration(),
    provideAnimations(),
    importProvidersFrom(FormlyModule.forRoot({
      validationMessages: [{ name: 'required', message: 'This field is required' }],
      types: [
        { name: 'tabs', component: FormlyFieldTabs },
        { name: 'exp-panel', component: FormlyFieldExpansionPanel },
        { name: 'table', component: FormlyFieldTable },
        { name: 'autocomplete', component: AutocompleteTypeComponent, wrappers: ['form-field'] },
      ],

    }),
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
      },
      }),
    MatNativeDateModule,
    FormlyMatDatepickerModule),
    MatAutocompleteModule,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ]
  
};
