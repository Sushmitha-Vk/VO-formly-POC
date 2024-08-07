import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions,FormlyModule } from '@ngx-formly/core';
import { FormlyFieldTabs } from './tabs.type';
import { FormlyMaterialModule } from '@ngx-formly/material';;




@Component({
  selector: 'app-root',
  standalone:true,
  imports:[RouterOutlet,FormlyFieldTabs,ReactiveFormsModule,FormlyMaterialModule,FormlyModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

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
              key: 'Checkbox',
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
          props: { label: 'Destination' },
          fieldGroup: [
            {
              key: 'country',
              type: 'input',
              props: {
                label: 'Country',
                required: true,
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
                        required: true,
                      },
                    },
                    {
                      key: 'state',
                      type: 'input',
                      props: {
                        label: 'State',
                        required: true,
                      },
                    },
                    {
                      key: 'pin',
                      type: 'number',
                      props: {
                        label: 'Pin code',
                        required: true,
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
                required: true,
              },
            },
          ],
        },
      ],
    },
  ];

  submit() {
    alert(JSON.stringify(this.model));
  }
}
