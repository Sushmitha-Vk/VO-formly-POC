import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions,FormlyModule } from '@ngx-formly/core';
import { FormlyFieldTabs } from './tabs.type';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { ApiService } from './api.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  standalone:true,
  imports:[RouterOutlet,FormlyFieldTabs,ReactiveFormsModule,FormlyMaterialModule,FormlyModule, MatButtonModule, MatIconModule,
  TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal'
  ];

  fields: FormlyFieldConfig[] = [
  {
      key: 'username',
      type: 'mu-ht-input', // <-- registered type for MnlFormHelperTextInputComponent
      props: {
        label: 'Username',
        placeholder: 'Enter your username',
        required: true,
        description: 'This will be used as your login ID.',
      },
    }
  ];

  constructor(private apiService: ApiService, public translate: TranslateService){
    translate.setDefaultLang('en');
  }

  submit() {
    alert(JSON.stringify(this.model));
    localStorage.setItem('submittedData', JSON.stringify(this.model));
  }

  

  filterStates(name: string) {
    return this.states.filter((state) => state.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
}
