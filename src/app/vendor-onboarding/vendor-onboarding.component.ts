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
  model: any = {}
//   {
//   exact_match_correct: "Yes",
//   exact_match_incorrect: "No",
//   range_within_correct: 150,
//   range_outside_incorrect: 2,
//   attempted_criteria: "Basic security measures",
//   no_helper_disabled: "technology"
// };
  options: FormlyFormOptions = {};
  previousData: any[] = [];
  translate = inject(TranslateService);
  fields: FormlyFieldConfig[] = [
  {
    "key": "question15",
    "type": "mu-helper-text",
    "props": {
      "label": "If you selected “Others” in the previous question, please specify the management system(s).",
      "helperProps": {
        "helperLabel": "Enable CAPA",
        "defaultHelperText": ""
      },
      "value": "",
      "required": true,
      "enableHelper": false,
      "hasScoreImpact": false,
      "readonly": false,
      "scoring": {
        "criteria": "attempted"
      },
      "defaultFieldConfig": {
        "type": "input",
        "props": {
          "label": "If you selected “Others” in the previous question, please specify the management system(s).",
          "placeholder": "",
          "appearance": "outline",
          "readonly": false,
          "required": true
        },
        "wrappers": ["form-field"]
      }
    }
  },
  {
    "type": "select",
    "key": "selectTest",
    "props": {
      "label": "Select Test",
      "placeholder": "",
      "appearance": "outline",
      "readonly": false,
      "required": true,
      "options": [
        {
          "label": "Yes Working",
          "value": "Yes Working"
        },
        {
          "label": "No",
          "value": "No"
        }
      ]
    }
  },
  {
    "key": "question8",
    "type": "mu-helper-text",
    "props": {
      "label": "Do you undertake risk assessment to identify potential impacts/opportunities across your value chain?",
      "helperProps": {
        "helperLabel": "Enable CAPA",
        "defaultHelperText": "Importance: Risk assessments help proactively identify environmental, social, and operational risks and opportunities, ensuring resilience and responsible decision-making.\nCorrective Action: Establish a structured risk assessment process covering key areas such as supply chain, compliance, sustainability, and stakeholder impact.\nPreventive Action: Integrate risk management into strategic planning, conduct periodic reviews, and engage cross-functional teams to ensure continuous improvement."
      },
      "value": "",
      "required": true,
      "enableHelper": false,
      "hasScoreImpact": true,
      "readonly": false,
      "scoring": {
        "criteria": "exactMatch",
        "answer": ["Yes"]
      },
      "defaultFieldConfig": {
        "type": "select",
        "props": {
          "label": "Do you undertake risk assessment to identify potential impacts/opportunities across your value chain?",
          "placeholder": "",
          "appearance": "outline",
          "readonly": false,
          "required": true,
          "options": [
            {
              "label": "Yes",
              "value": "Yes"
            },
            {
              "label": "No",
              "value": "No"
            }
          ]
        },
        "wrappers": ["form-field"]
      }
    }
  },
  {
    "key": "question9",
    "type": "mu-helper-text",
    "props": {
      "label": "Do you have any ongoing litigation or regulatory notices with respect to compliance?",
      "helperProps": {
        "helperLabel": "Enable CAPA",
        "defaultHelperText": "Importance: Timely disclosure and resolution of litigation or regulatory notices are critical to maintaining trust, legal compliance, and business continuity.\nCorrective Action: Document all ongoing cases, assess root causes, and implement immediate remedial actions in consultation with legal and compliance teams.\nPreventive Action: Establish a compliance monitoring framework and conduct periodic legal risk assessments to proactively identify and mitigate future issues."
      },
      "value": "",
      "required": true,
      "enableHelper": false,
      "hasScoreImpact": true,
      "readonly": false,
      "scoring": {
        "criteria": "exactMatch",
        "answer": ["No"]
      },
      "defaultFieldConfig": {
        "type": "select",
        "props": {
          "label": "Do you have any ongoing litigation or regulatory notices with respect to compliance?",
          "placeholder": "",
          "appearance": "outline",
          "readonly": false,
          "required": true,
          "options": [
            {
              "label": "Yes",
              "value": "Yes"
            },
            {
              "label": "No",
              "value": "No"
            }
          ]
        },
        "wrappers": ["form-field"]
      }
    }
  },
  {
    "key": "question10",
    "type": "mu-helper-text",
    "props": {
      "label": "Is there any legal proceedings associated with fraud, anti-corruption, bribery, unfair labor practices, human rights abuses or other malpractices?",
      "helperProps": {
        "helperLabel": "Enable CAPA",
        "defaultHelperText": "Importance: Addressing such legal issues is vital to uphold ethical standards, protect stakeholder trust, and ensure regulatory compliance.\nCorrective Action:  Document and disclose case details, cooperate with investigations, and implement immediate corrective measures including leadership accountability and policy enforcement.\nPreventive Action: Strengthen internal controls, conduct regular ethics and compliance training, and establish whistleblower mechanisms to prevent recurrence."
      },
      "value": "",
      "required": true,
      "enableHelper": false,
      "hasScoreImpact": true,
      "readonly": false,
      "scoring": {
        "criteria": "exactMatch",
        "answer": ["No"]
      },
      "defaultFieldConfig": {
        "type": "select",
        "props": {
          "label": "Is there any legal proceedings associated with fraud, anti-corruption, bribery, unfair labor practices, human rights abuses or other malpractices?",
          "placeholder": "",
          "appearance": "outline",
          "readonly": false,
          "required": true,
          "options": [
            {
              "label": "Yes",
              "value": "Yes"
            },
            {
              "label": "No",
              "value": "No"
            }
          ]
        },
        "wrappers": ["form-field"]
      }
    }
  },
  {
    "key": "question11",
    "type": "mu-helper-text",
    "props": {
      "label": "Does your company have any sustainability certifications (Ecovadis/SEDEX/FSC/RSPO)?",
      "helperProps": {
        "helperLabel": "Enable CAPA",
        "defaultHelperText": "Importance: Sustainability certifications validate responsible practices and enhance credibility with stakeholders, regulators, and customers.\nCorrective Action: Supplier to initiate the process of obtaining relevant certifications if required and relevant (e.g., Ecovadis, SEDEX, FSC, RSPO) aligned with their operations and industry standards.\nPreventive Action: Develop a sustainability roadmap with periodic reviews to ensure continuous improvement and readiness for future certification requirements.\""
      },
      "value": "",
      "required": true,
      "enableHelper": false,
      "hasScoreImpact": true,
      "readonly": false,
      "scoring": {
        "criteria": "exactMatch",
        "answer": ["Yes"]
      },
      "defaultFieldConfig": {
        "type": "select",
        "props": {
          "label": "Does your company have any sustainability certifications (Ecovadis/SEDEX/FSC/RSPO)?",
          "placeholder": "",
          "appearance": "outline",
          "readonly": false,
          "required": true,
          "options": [
            {
              "label": "Yes",
              "value": "Yes"
            },
            {
              "label": "No",
              "value": "No"
            }
          ]
        },
        "wrappers": ["form-field"]
      }
    }
  },
  {
    "key": "question12",
    "type": "mu-helper-text",
    "props": {
      "label": "Do you have an Information Security Policy?",
      "helperProps": {
        "helperLabel": "Enable CAPA",
        "defaultHelperText": "Importance: An Information Security Policy is essential to safeguard sensitive data, ensure regulatory compliance, and protect against cyber threats.\nCorrective Action: Supplier to develop and implement a formal Information Security Policy covering data protection, access control, and incident response.\nPreventive Action: Conduct regular security audits, employee training, and policy reviews to maintain robust information security practices.\""
      },
      "value": "",
      "required": true,
      "enableHelper": false,
      "hasScoreImpact": true,
      "readonly": false,
      "scoring": {
        "criteria": "exactMatch",
        "answer": ["Yes"]
      },
      "defaultFieldConfig": {
        "type": "select",
        "props": {
          "label": "Do you have an Information Security Policy?",
          "placeholder": "",
          "appearance": "outline",
          "readonly": false,
          "required": true,
          "options": [
            {
              "label": "Yes",
              "value": "Yes"
            },
            {
              "label": "No",
              "value": "No"
            }
          ]
        },
        "wrappers": ["form-field"]
      }
    }
  }
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
    this.model = JSON.parse(localStorage.getItem('ModelData') || '{}');
    console.log(this.model);
    // this.form.disable({emitEvent: false});
    // If you have a specific form ID to fetch, you can uncomment and use the following line
    // this.apiService.getFormById('66c7174609d62049315b4cb1').subscribe((form)=>{
    //   this.fields = parse(form.formFieldConfigs)
    //   if (this.vendorId) {
    //     this.getDataById(this.vendorId);
    //   }
    // })
    // this.getAllData();
  }

  submit() {
   localStorage.setItem('ModelData', JSON.stringify(this.model));

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
