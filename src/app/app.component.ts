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


@Component({
  selector: 'app-root',
  standalone:true,
  imports:[RouterOutlet,FormlyFieldTabs,ReactiveFormsModule,FormlyMaterialModule,FormlyModule, MatButtonModule, MatIconModule
  ],
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
      type: 'tabs',
      fieldGroup: [
        {
          props: { label: 'Personal data' },
          fieldGroup: [
            {
              key: 'panNo',
              type: 'input',
              props: {
                label: 'Enter PAN No',
                required: true,
              },
            },
            {
              key: 'accountNumber',
              type: 'input',
              props: {
                type: 'number',
                label: 'Account Number',
                required: true,
              },
            },
            {
              key: 'remarks',
              type: 'textarea',
              props: {
                label: 'Remaks,if any',
                placeholder: 'Please enter your message here',
                description: 'Please enter your message',
                required: false,
              },
            },
            {
              key: 'acceptTerms',
              type: 'checkbox',
              props: {
                label: 'Accept terms',
                description: 'In order to proceed, please accept terms',
                pattern: 'true',
                required: true,
              },
              validation: {
                messages: {
                  pattern: 'Please accept the terms',
                },
              },
            },
          ],
        },
        {
          props: { label: 'ESG/EH' },
          fieldGroup: [
            {
              key: 'countryOfHeadQuarter',
              type: 'select',
              props: {
                label: 'Country of Headquarter',
                required: true,
                options: [
                  { value: 'India', label: 'India' },
                  { value: 'China', label: 'China' },
                  { value: 'Japan', label: 'Japan' },
                  { value: 'France', label: 'France'},
                  { value: 'Germany', label: 'Germany'},
                  { value: 'Italy', label: 'Italy'},
                ],
              },
            },
            {
              key: 'noOfEmployees',
              type: 'number',
              props: {
                label: 'Number of Employees',
                required: false,
              },
            },
            {
              key: 'revenue',
              type: 'input',
              props: {
                label: 'Revenue of company',
                required: false,
              },
            },
            {
              key: 'doesYourCompUseRenewableElectricity',
              type: 'radio',
              props: {
                label: 'Does your company use renewable electricity?',
                required: false,
                options: [
                  { value: 'Yes', label: 'Yes' },
                  { value: 'No', label: 'No' }
                ],
              },
            },
            {
              key: 'ghgEmissionInventoryAssurance',
              type: 'radio',
              props: {
                label: 'Has your company has done GHG Emission inventory assurance by 3rd party?',
                required: false,
                options: [
                  { value: 'Yes', label: 'Yes' },
                  { value: 'No', label: 'No' }
                ],
              },
            },
            {
              key: 'doesYourCompanyCalculateTheGhgEmissions',
              type: 'radio',
              props: {
                label: 'Does your company calculate the GHG Emissions?',
                required: false,
                options: [
                  { value: 'Yes', label: 'Yes' },
                  { value: 'No', label: 'No' }
                ],
              },
            },
            {
              key: 'scope1Emissions',
              type: 'input',
              props: {
                label: 'Scope 1 emissions',
                placeholder: 'Provide GHG Emission data tCO2e',
                required: false,
              },
              expressions: {
                hide: "model.doesYourCompanyCalculateTheGhgEmissions !== 'Yes'",
              },
            },
            {
              key: 'scope2Emissions',
              type: 'input',
              props: {
                label: 'Scope 2 emissions',
                placeholder: 'Provide GHG Emission data tCO2e',
                required: false,
              },
              expressions: {
                hide: "model.doesYourCompanyCalculateTheGhgEmissions !== 'Yes'",
              },
            },
            {
              key: 'scope3Emissions',
              type: 'input',
              props: {
                label: 'Scope 3 emissions',
                placeholder: 'Provide GHG Emission data tCO2e',
                required: false,
              },
              expressions: {
                hide: "model.doesYourCompanyCalculateTheGhgEmissions !== 'Yes'",
              },
            },
            {
              key: 'reasonForNotCalculationgGhgEmissions',
              type: 'input',
              props: {
                label: 'Please provide reasons for not calculating the GHG emissions',
                required: false,
              },
              expressions: {
                hide: "model.doesYourCompanyCalculateTheGhgEmissions !== 'No'",
              },
            },
            {
              key: 'yourGhgEmissionsDataArePublished',
              type: 'radio',
              props: {
                label: 'Your GHG emissions data are published?',
                required: false,
                options: [
                  { value: 'Yes', label: 'Yes' },
                  { value: 'No', label: 'No' }
                ],
              },
            },
            {
              key: 'Date',
              type: 'datepicker',
              props: {
                label: 'Select the Date',
                required: true,
                datepickerOptions: {
                  min: new Date(),
                  max: new Date( '08/30/2024')
                }
              },
            },
            {
              key: 'selectTheState',
              type: 'autocomplete',
              props: {
                required: true,
                label: 'Select the State',
                placeholder: 'Placeholder',
                filter: (term: string) => of(term ? this.filterStates(term) : this.states.slice()),
              },
            },
            {
              key: 'fieldsNotAvailableInTIN',
              type: 'select',
              props: {
                label: 'Select the fields not available in TIN / No PE certificate',
                multiple: true,
                required: true,
                options: [
                  { value: 'name', label: 'Name' },
                  { value: 'status', label: 'Status' },
                  { value: 'tin', label: 'TIN' },
                  { value: 'validityPeriodOfTIN', label: 'Validity Period of TIN' },
                  { value: 'address', label: 'Address'}
                ],
              },
            },
          ],
        },
        {
          props: { label: 'Account Details' },
          fieldGroup: [
            {
              type: 'exp-panel',
              props: { label: 'Address' },
              fieldGroup: [
                {
                  fieldGroup: [
                    {
                      key: 'country',
                      type: 'input',
                      props: {
                        label: 'Country',
                        required: false,
                      },
                    },
                    {
                      key: 'state',
                      type: 'input',
                      props: {
                        label: 'State',
                        required: false,
                      },
                    },
                    {
                      key: 'pin',
                      type: 'number',
                      props: {
                        label: 'Pin code',
                        required: false,
                      },
                    },
                    
                  ]
                }
              ]
            },
            {
              key: 'bankDetails',
              type: 'table',
              props: {
                height: '200px',
                gridOptions: {
                  rowHeight: 42,
                  columnDefs: [
                    'name', 'accountType', 'accountNumber', 'ifscCode'
                    // {
                    //   headerName: 'Name',
                    //   field: 'name',
                    //   sortable: true,
                    //   width: 350,
                    // }
                  ],
                  data: [
                    {name: 'John', accountType: 'Current', accountNumber: '64432677', ifscCode: 'hcb43'},
                    {name: 'Abram', accountType: 'Current', accountNumber: '64432677', ifscCode: 'hcb43'},
                    {name: 'Cist', accountType: 'Savings', accountNumber: '64432677', ifscCode: 'hcb43'},
                    {name: 'Alphy', accountType: 'Current', accountNumber: '64432677', ifscCode: 'hcb43'},
                    {name: 'Zench', accountType: 'Current', accountNumber: '64432677', ifscCode: 'hcb43'},
                    {name: 'Linchy', accountType: 'Savings', accountNumber: '64432677', ifscCode: 'hcb43'},
                    {name: 'Morgy', accountType: 'Current', accountNumber: '64432677', ifscCode: 'hcb43'},
                  ]
                },
              },
            },
          ],
        },
        {
          props: { label: 'Day of the trip' },
          fieldGroup: [
            {
              key: 'day',
              type: 'input',
              props: {
                type: 'date',
                label: 'Day of the trip',
                required: false,
              },
            },
          ],
        },
      ],
    },
  ];

  constructor(private apiService: ApiService){}

  submit() {
    // alert(JSON.stringify(this.model));
    // localStorage.setItem('submittedData', JSON.stringify(this.model));
    const data = {
      file: this.model,
      data: JSON.stringify(this.model),
      status: 'Active'
    }
    
this.apiService.addData(data).subscribe();
  }

  getAllData(){
    this.apiService.getData().subscribe((x)=>{
console.log(x);
    })
  }

  filterStates(name: string) {
    return this.states.filter((state) => state.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
}
