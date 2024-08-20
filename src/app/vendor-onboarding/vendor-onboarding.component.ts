import { Component, inject, Input, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {
  FormlyModule,
  FormlyFormOptions,
  FormlyFieldConfig,
} from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyFieldTabs } from '../tabs.type';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import {parse, stringify } from 'flatted';

@Component({
  selector: 'app-vendor-onboarding',
  standalone: true,
  imports: [
    RouterOutlet,
    FormlyFieldTabs,
    ReactiveFormsModule,
    FormlyMaterialModule,
    FormlyModule,
    MatToolbarModule,
    CommonModule,
  ],
  templateUrl: './vendor-onboarding.component.html',
  styleUrl: './vendor-onboarding.component.scss',
})
export class VendorOnboardingComponent implements OnInit {
  @Input() vendorId: any;
  form = new FormGroup({});
  model: any = {
    profitLossStatement: [
      {
        year: 2024,
        revenue: 750000,
        costOfGoodsSold: 200000,
        sellingGeneralAdministrativeCost: 90000,
        ebitda: 460000,
        depreciation: 30000,
        operatingIncome: 430000,
        interestExpense: 25000,
        taxExpenses: 70000,
        netIncome: 335000,
      },
      {
        year: 2024,
        revenue: 600000,
        costOfGoodsSold: 180000,
        sellingGeneralAdministrativeCost: 85000,
        ebitda: 335000,
        depreciation: 20000,
        operatingIncome: 315000,
        interestExpense: 15000,
        taxExpenses: 50000,
        netIncome: 265000,
      },
      {
        year: 2024,
        revenue: 800000,
        costOfGoodsSold: 220000,
        sellingGeneralAdministrativeCost: 95000,
        ebitda: 485000,
        depreciation: 25000,
        operatingIncome: 460000,
        interestExpense: 30000,
        taxExpenses: 80000,
        netIncome: 350000,
      },
      {
        year: 2024,
        revenue: 550000,
        costOfGoodsSold: 170000,
        sellingGeneralAdministrativeCost: 75000,
        ebitda: 335000,
        depreciation: 15000,
        operatingIncome: 320000,
        interestExpense: 20000,
        taxExpenses: 60000,
        netIncome: 260000,
      },
      {
        year: 2024,
        revenue: 700000,
        costOfGoodsSold: 190000,
        sellingGeneralAdministrativeCost: 88000,
        ebitda: 422000,
        depreciation: 22000,
        operatingIncome: 400000,
        interestExpense: 18000,
        taxExpenses: 65000,
        netIncome: 317000,
      },
      {
        year: 2024,
        revenue: 650000,
        costOfGoodsSold: 200000,
        sellingGeneralAdministrativeCost: 80000,
        ebitda: 370000,
        depreciation: 25000,
        operatingIncome: 345000,
        interestExpense: 20000,
        taxExpenses: 60000,
        netIncome: 265000,
      },
      {
        year: 2024,
        revenue: 720000,
        costOfGoodsSold: 210000,
        sellingGeneralAdministrativeCost: 95000,
        ebitda: 415000,
        depreciation: 27000,
        operatingIncome: 388000,
        interestExpense: 22000,
        taxExpenses: 70000,
        netIncome: 316000,
      },
      {
        year: 2024,
        revenue: 800000,
        costOfGoodsSold: 230000,
        sellingGeneralAdministrativeCost: 90000,
        ebitda: 480000,
        depreciation: 30000,
        operatingIncome: 450000,
        interestExpense: 25000,
        taxExpenses: 80000,
        netIncome: 345000,
      },
      {
        year: 2024,
        revenue: 670000,
        costOfGoodsSold: 190000,
        sellingGeneralAdministrativeCost: 85000,
        ebitda: 395000,
        depreciation: 20000,
        operatingIncome: 375000,
        interestExpense: 18000,
        taxExpenses: 65000,
        netIncome: 310000,
      },
      {
        year: 2024,
        revenue: 740000,
        costOfGoodsSold: 220000,
        sellingGeneralAdministrativeCost: 88000,
        ebitda: 432000,
        depreciation: 24000,
        operatingIncome: 408000,
        interestExpense: 21000,
        taxExpenses: 70000,
        netIncome: 317000,
      },
      {
        year: 2024,
        revenue: 620000,
        costOfGoodsSold: 200000,
        sellingGeneralAdministrativeCost: 80000,
        ebitda: 340000,
        depreciation: 18000,
        operatingIncome: 322000,
        interestExpense: 16000,
        taxExpenses: 58000,
        netIncome: 266000,
      },
    ],
  };
  options: FormlyFormOptions = {};
  previousData: any[] = [];
  translate = inject(TranslateService);
  fields!: FormlyFieldConfig[] ;
  //  [
  //   {
  //     type: 'tabs',
  //     fieldGroup: [
  //       {
  //         key: 'exampleinput',
  //         type: 'input',
  //         props: {
  //           label: 'Enter input',
  //           required: false,
  //         },
  //         // expressions: {
  //         //   'props.label': this.translate.stream('FORM.PANNUMBER'),
  //         // },
  //       },
  //       {
  //         type: 'stepper',
  //         props: {
  //           label: 'Form',
  //         },
  //         fieldGroup: [
  //           {
  //             props: { label: 'Personal data' },
  //             fieldGroup: [
  //               {
  //                 key: 'panNo',
  //                 type: 'input',
  //                 props: {
  //                   // label: 'Enter PAN No',
  //                   required: true,
  //                 },
  //                 expressions: {
  //                   'props.label': this.translate.stream('FORM.PANNUMBER'),
  //                 },
  //               },
  //               {
  //                 key: 'accountNumber',
  //                 type: 'input',
  //                 props: {
  //                   type: 'number',
  //                   // label: 'Account Number',
  //                   required: true,
  //                 },
  //                 expressions: {
  //                   'props.label': this.translate.stream('FORM.ACCNUMBER'),
  //                 },
  //               },
  //               {
  //                 key: 'remarks',
  //                 type: 'textarea',
  //                 props: {
  //                   // label: 'Remaks,if any',
  //                   placeholder: 'Please enter your message here',
  //                   description: 'Please enter your message',
  //                   required: false,
  //                 },
  //                 expressions: {
  //                   'props.label': this.translate.stream('FORM.REMARKS'),
  //                 },
  //               },
  //               {
  //                 key: 'acceptTerms',
  //                 type: 'checkbox',
  //                 props: {
  //                   // label: 'Accept terms',
  //                   description: 'In order to proceed, please accept terms',
  //                   pattern: 'true',
  //                   required: true,
  //                 },
  //                 expressions: {
  //                   'props.label': this.translate.stream('FORM.TERMS'),
  //                 },
  //                 validation: {
  //                   messages: {
  //                     pattern: 'Please accept the terms',
  //                   },
  //                 },
  //               },
  //             ],
  //           },
  //           {
  //             props: { label: 'ESG/EH' },
  //             fieldGroup: [
  //               {
  //                 key: 'countryOfHeadQuarter',
  //                 type: 'select',
  //                 props: {
  //                   label: 'Country of Headquarter',
  //                   required: true,
  //                   options: [
  //                     { value: 'India', label: 'India' },
  //                     { value: 'China', label: 'China' },
  //                     { value: 'Japan', label: 'Japan' },
  //                     { value: 'France', label: 'France' },
  //                     { value: 'Germany', label: 'Germany' },
  //                     { value: 'Italy', label: 'Italy' },
  //                   ],
  //                 },
  //               },
  //               {
  //                 key: 'noOfEmployees',
  //                 type: 'number',
  //                 props: {
  //                   label: 'Number of Employees',
  //                   required: false,
  //                 },
  //               },
  //               {
  //                 key: 'revenue',
  //                 type: 'input',
  //                 props: {
  //                   label: 'Revenue of company',
  //                   required: false,
  //                 },
  //               },
  //               {
  //                 key: 'doesYourCompUseRenewableElectricity',
  //                 type: 'radio',
  //                 props: {
  //                   label: 'Does your company use renewable electricity?',
  //                   required: false,
  //                   options: [
  //                     { value: 'Yes', label: 'Yes' },
  //                     { value: 'No', label: 'No' },
  //                   ],
  //                 },
  //               },
  //               {
  //                 key: 'ghgEmissionInventoryAssurance',
  //                 type: 'radio',
  //                 props: {
  //                   label:
  //                     'Has your company has done GHG Emission inventory assurance by 3rd party?',
  //                   required: false,
  //                   options: [
  //                     { value: 'Yes', label: 'Yes' },
  //                     { value: 'No', label: 'No' },
  //                   ],
  //                 },
  //               },
  //               {
  //                 key: 'doesYourCompanyCalculateTheGhgEmissions',
  //                 type: 'radio',
  //                 props: {
  //                   label: 'Does your company calculate the GHG Emissions?',
  //                   required: false,
  //                   options: [
  //                     { value: 'Yes', label: 'Yes' },
  //                     { value: 'No', label: 'No' },
  //                   ],
  //                 },
  //               },
  //               {
  //                 key: 'scope1Emissions',
  //                 type: 'input',
  //                 props: {
  //                   label: 'Scope 1 emissions',
  //                   placeholder: 'Provide GHG Emission data tCO2e',
  //                   required: false,
  //                 },
  //                 expressions: {
  //                   hide: "model.doesYourCompanyCalculateTheGhgEmissions !== 'Yes'",
  //                 },
  //               },
  //               {
  //                 key: 'scope2Emissions',
  //                 type: 'input',
  //                 props: {
  //                   label: 'Scope 2 emissions',
  //                   placeholder: 'Provide GHG Emission data tCO2e',
  //                   required: false,
  //                 },
  //                 expressions: {
  //                   hide: "model.doesYourCompanyCalculateTheGhgEmissions !== 'Yes'",
  //                 },
  //               },
  //               {
  //                 key: 'scope3Emissions',
  //                 type: 'input',
  //                 props: {
  //                   label: 'Scope 3 emissions',
  //                   placeholder: 'Provide GHG Emission data tCO2e',
  //                   required: false,
  //                 },
  //                 expressions: {
  //                   hide: "model.doesYourCompanyCalculateTheGhgEmissions !== 'Yes'",
  //                 },
  //               },
  //               {
  //                 key: 'reasonForNotCalculationgGhgEmissions',
  //                 type: 'input',
  //                 props: {
  //                   label:
  //                     'Please provide reasons for not calculating the GHG emissions',
  //                   required: false,
  //                 },
  //                 expressions: {
  //                   hide: "model.doesYourCompanyCalculateTheGhgEmissions !== 'No'",
  //                 },
  //               },
  //               {
  //                 key: 'yourGhgEmissionsDataArePublished',
  //                 type: 'radio',
  //                 props: {
  //                   label: 'Your GHG emissions data are published?',
  //                   required: false,
  //                   options: [
  //                     { value: 'Yes', label: 'Yes' },
  //                     { value: 'No', label: 'No' },
  //                   ],
  //                 },
  //               },
  //               {
  //                 key: 'listOfKeyBankers',
  //                 type: 'multi-select-autocomplete',
  //                 props: {
  //                   required: true,
  //                   label: 'Please provide a list of your key bankers',
  //                   options: [
  //                     'State Bank Of India',
  //                     'Canara Bank',
  //                     'City Bank',
  //                     'HDFC Bank',
  //                     'ICICI Bank',
  //                     'Axis Bank',
  //                     'Central Bank',
  //                   ],
  //                 },
  //               },
  //             ],
  //           },
  //           {
  //             props: { label: 'Account Details' },
  //             fieldGroup: [
  //               {
  //                 type: 'exp-panel',
  //                 props: { label: 'Address' },
  //                 fieldGroup: [
  //                   {
  //                     fieldGroup: [
  //                       {
  //                         key: 'country',
  //                         type: 'input',
  //                         props: {
  //                           label: 'Country',
  //                           required: false,
  //                         },
  //                       },
  //                       {
  //                         key: 'state',
  //                         type: 'input',
  //                         props: {
  //                           label: 'State',
  //                           required: false,
  //                         },
  //                       },
  //                       {
  //                         key: 'pin',
  //                         type: 'number',
  //                         props: {
  //                           label: 'Pin code',
  //                           required: false,
  //                         },
  //                       },
  //                     ],
  //                   },
  //                 ],
  //               },
  //               {
  //                 key: 'bankDetails',
  //                 type: 'table',
  //                 props: {
  //                   height: '200px',
  //                   gridOptions: {
  //                     rowHeight: 42,
  //                     columnDefs: [
  //                       'name',
  //                       'accountType',
  //                       'accountNumber',
  //                       'ifscCode',
  //                       // {
  //                       //   headerName: 'Name',
  //                       //   field: 'name',
  //                       //   sortable: true,
  //                       //   width: 350,
  //                       // }
  //                     ],
  //                     data: [
  //                       {
  //                         name: 'John',
  //                         accountType: 'Current',
  //                         accountNumber: '64432677',
  //                         ifscCode: 'hcb43',
  //                       },
  //                       {
  //                         name: 'Abram',
  //                         accountType: 'Current',
  //                         accountNumber: '64432677',
  //                         ifscCode: 'hcb43',
  //                       },
  //                       {
  //                         name: 'Cist',
  //                         accountType: 'Savings',
  //                         accountNumber: '64432677',
  //                         ifscCode: 'hcb43',
  //                       },
  //                       {
  //                         name: 'Alphy',
  //                         accountType: 'Current',
  //                         accountNumber: '64432677',
  //                         ifscCode: 'hcb43',
  //                       },
  //                       {
  //                         name: 'Zench',
  //                         accountType: 'Current',
  //                         accountNumber: '64432677',
  //                         ifscCode: 'hcb43',
  //                       },
  //                       {
  //                         name: 'Linchy',
  //                         accountType: 'Savings',
  //                         accountNumber: '64432677',
  //                         ifscCode: 'hcb43',
  //                       },
  //                       {
  //                         name: 'Morgy',
  //                         accountType: 'Current',
  //                         accountNumber: '64432677',
  //                         ifscCode: 'hcb43',
  //                       },
  //                     ],
  //                   },
  //                 },
  //               },
  //             ],
  //           },
  //           {
  //             props: { label: 'Comment' },
  //             // expressions: {
  //             //   hide: "field.model.id == 22"
  //             // },
  //             fieldGroup: [
  //               {
  //                 key: 'comment',
  //                 type: 'textarea',
  //                 props: {
  //                   label: 'Comments',
  //                   placeholder: 'Please enter your comments here',
  //                   description: 'Please enter your comments',
  //                   required: false,
  //                 },
  //               },
  //               {
  //                 key: 'file',
  //                 type: 'file',
  //               },
  //             ],
  //           },
  //           {
  //             props: { label: 'Profit & Loss Statement' },
  //             fieldGroup: [
  //               {
  //                 key: 'profitLossStatement',
  //                 type: 'grid',
  //                 className: 'ag-theme-balham',
  //                 props: {
  //                   height: '300px',
  //                   gridOptions: {
  //                     rowHeight: 42,
  //                     columnDefs: [
  //                       {
  //                         headerName: 'Year',
  //                         field: 'year',
  //                         sortable: true,
  //                         width: 350,
  //                       },
  //                       {
  //                         headerName: 'Revenue',
  //                         field: 'revenue',
  //                         sortable: true,
  //                         width: 350,
  //                       },
  //                       {
  //                         headerName: 'Cost of goods sold (COGS)',
  //                         field: 'costOfGoodsSold',
  //                         width: 330,
  //                       },
  //                       {
  //                         headerName: 'Selling, General & administrative cost',
  //                         field: 'sellingGeneralAdministrativeCost',
  //                         sortable: true,
  //                         width: 350,
  //                       },
  //                       {
  //                         headerName: 'EBITDA',
  //                         field: 'ebitda',
  //                         sortable: true,
  //                         width: 350,
  //                       },
  //                       {
  //                         headerName: 'Depreciation and Amortization',
  //                         field: 'depreciation',
  //                         sortable: true,
  //                         width: 350,
  //                       },
  //                       {
  //                         headerName: 'Operating income (EBIT)',
  //                         field: 'operatingIncome',
  //                         sortable: true,
  //                         width: 350,
  //                       },
  //                       {
  //                         headerName: 'Interest expense',
  //                         field: 'interestExpense',
  //                         sortable: true,
  //                         width: 350,
  //                       },
  //                       {
  //                         headerName: 'Tax expenses',
  //                         field: 'taxExpenses',
  //                         sortable: true,
  //                         width: 350,
  //                       },
  //                       {
  //                         headerName: 'Net income / PAT',
  //                         field: 'netIncome',
  //                         sortable: true,
  //                         width: 350,
  //                       },
  //                     ],
  //                   },
  //                 },
  //                 fieldArray: {
  //                   fieldGroup: [
  //                     {
  //                       type: 'input',
  //                       key: 'year',
  //                       props: {
  //                         required: true,
  //                       },
  //                     },
  //                     {
  //                       type: 'input',
  //                       key: 'revenue',
  //                       props: {
  //                         required: true,
  //                       },
  //                     },
  //                     {
  //                       type: 'input',
  //                       key: 'costOfGoodsSold',
  //                       props: {
  //                         required: true,
  //                       },
  //                     },
  //                     {
  //                       type: 'input',
  //                       key: 'sellingGeneralAdministrativeCost',
  //                       props: {
  //                         required: true,
  //                       },
  //                     },
  //                     {
  //                       type: 'input',
  //                       key: 'ebitda',
  //                       props: {
  //                         required: true,
  //                       },
  //                     },
  //                     {
  //                       type: 'input',
  //                       key: 'depreciation',
  //                       props: {
  //                         required: true,
  //                       },
  //                     },
  //                     {
  //                       type: 'input',
  //                       key: 'operatingIncome',
  //                       props: {
  //                         required: true,
  //                       },
  //                     },
  //                     {
  //                       type: 'input',
  //                       key: 'interestExpense',
  //                       props: {
  //                         required: true,
  //                       },
  //                     },
  //                     {
  //                       type: 'input',
  //                       key: 'taxExpenses',
  //                       props: {
  //                         required: true,
  //                       },
  //                     },
  //                     {
  //                       type: 'input',
  //                       key: 'netIncome',
  //                       props: {
  //                         required: true,
  //                       },
  //                     },
  //                   ],
  //                 },
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getFormById('66c425f163cbf14433472d4a').subscribe((form)=>{
      this.fields = parse(form.formFieldConfigs)
    })
    if (this.vendorId) {
      this.getDataById(this.vendorId);
    }
    this.getAllData();
  }

  submit() {
    const data = {
      file: '',
      formData: this.model,
      status: 'Submitted',
    };
    this.apiService.addData(data).subscribe();
  }

  getAllData() {
    this.apiService.getAllSubmittedData().subscribe((data) => {
      this.previousData = data;
      console.log(data);
    });
  }

  getDataById(id: string) {
    this.apiService.getDataById(id).subscribe((data) => {
      this.previousData = data.formData;
      this.model = { ...this.previousData, id: data._id };
    });
  }

  createNewForm(){
     const formData={
        formName: 'vendor_onboarding',
        formFieldConfigs: stringify(this.fields),
    }
    this.apiService.createNewForm(formData).subscribe();
  }
}
