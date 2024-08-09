import { Component, inject, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FormlyModule, FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyFieldTabs } from '../tabs.type';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-vendor-onboarding',
  standalone: true,
  imports:[RouterOutlet,FormlyFieldTabs,ReactiveFormsModule,FormlyMaterialModule,FormlyModule, MatToolbarModule,
    CommonModule
  ],
  templateUrl: './vendor-onboarding.component.html',
  styleUrl: './vendor-onboarding.component.scss'
})
export class VendorOnboardingComponent implements OnInit{
  @Input() vendorId: any;
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  previousData: any[] = [];
  translate = inject(TranslateService);
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
                // label: 'Enter PAN No',
                required: true,
              },
              expressions: {
                'props.label': this.translate.stream('FORM.PANNUMBER'),
              },
            },
            {
              key: 'accountNumber',
              type: 'input',
              props: {
                type: 'number',
                // label: 'Account Number',
                required: true,
              },
              expressions: {
                'props.label': this.translate.stream('FORM.ACCNUMBER'),
              },
            },
            {
              key: 'remarks',
              type: 'textarea',
              props: {
                // label: 'Remaks,if any',
                placeholder: 'Please enter your message here',
                description: 'Please enter your message',
                required: false,
              },
              expressions: {
                'props.label': this.translate.stream('FORM.REMARKS'),
              },
            },
            {
              key: 'acceptTerms',
              type: 'checkbox',
              props: {
                // label: 'Accept terms',
                description: 'In order to proceed, please accept terms',
                pattern: 'true',
                required: true,
              },
              expressions: {
                'props.label': this.translate.stream('FORM.TERMS'),
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
            }
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
          props: { label: 'Comment' },
          // expressions: {
          //   hide: "field.model.id == 22"
          // },
          fieldGroup: [
            {
              key: 'comment',
              type: 'textarea',
              props: {
                label: 'Comments',
                placeholder: 'Please enter your comments here',
                description: 'Please enter your comments',
                required: false,
              }
            },
          ]
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

  ngOnInit(): void {
      this.previousData = JSON.parse(localStorage.getItem('submittedData') ?? '[]');
      if(this.vendorId && this.previousData.length) {
        const formData = this.previousData.find(data => data.id == this.vendorId)?.formData
        this.model = { ...formData, id: this.vendorId };

      }
  }
  submit() {
    alert(JSON.stringify(this.model));
    this.previousData.push({id: this.model.accountNumber, status: 'Submitted' , formData: this.model})
    localStorage.setItem('submittedData', JSON.stringify(this.previousData));
    window.location.reload();
  }
}
