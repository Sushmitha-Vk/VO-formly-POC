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
  fields: FormlyFieldConfig[] 
  =
   [
    {
          key: 'companyName',
          type: 'mu-helper-text',
          props: {
            label: 'Company Name',
            helperLabel: 'Need help?',
            value: '',
            enableHelper: false,
            readonly: false,
            defaultFieldConfig: {
              type: 'input',
              props: {
                label: 'Company Name',
                placeholder: '',
                rows: 4,
                readonly: false,
              },
              wrappers: ['form-field'],
            },
          },
        },
  ];

  schemaDefinition = {
    type: 'object',
    properties: {
      personalDataStep: {
        type: 'object',
        properties: {
          panNo: {
            type: 'string',
            optional: false,
            minLength: 2
          },
          acceptTerms:  {
            type: 'boolean',
            optional: false
          },
        }
      },
      esgStep: {
        type: 'object',
        properties: {
          countryOfHeadQuarter: {
            type: 'string',
            optional: false,
          },
          listOfKeyBankers:  {
            type: 'array',
            optional: false
          },
        }
      },
    }
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // this.apiService.getFormById('66c7174609d62049315b4cb1').subscribe((form)=>{
    //   this.fields = parse(form.formFieldConfigs)
    //   if (this.vendorId) {
    //     this.getDataById(this.vendorId);
    //   }
    // })
    // this.getAllData();
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
        formName: 'VO_formfields',
        formFieldConfigs: stringify(this.fields),
    }
    this.apiService.createNewForm(formData).subscribe();
  }

  createNewSchema(){
    const formData={
       formName: 'VO_schema',
       formFieldConfigs: stringify(this.schemaDefinition),
   }
   this.apiService.createNewForm(formData).subscribe();
 }
}
