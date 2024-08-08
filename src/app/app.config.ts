import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyFieldTabs } from './tabs.type';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormlyFieldExpansionPanel } from './expansion-panel.types';
import { FormlyFieldTable } from './table.types';

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
      ],

    }),)
   
  ]
  
};
