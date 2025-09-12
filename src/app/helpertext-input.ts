import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@Component({
  selector: 'mnl-form-helper-text-input',
  standalone: true,
  imports: [CommonModule, MatInputModule, FormlyModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatSlideToggleModule],
  template: `
  <div class="container">
  <mat-label>{{ to.label }}</mat-label>
  <div class="flex-row">
    <span class="answer">Answer: {{to['value']}}</span>
    <mat-slide-toggle [(ngModel)]="checked" (toggleChange)="toggleSlide()">{{to['helperLabel']}}</mat-slide-toggle>
  </div>
    <mat-form-field class="textarea" appearance="outline" *ngIf="showTextArea()">
      <textarea  matInput [formControl]="formControl" [formlyAttributes]="field"> </textarea>
    </mat-form-field>
  </div>

  `,
  styles:`
     .container{
      display: flex;
      flex-direction: column;
     }
     .answer{
      font-size: 12px;
     }
     .textarea{
      margin: 0px !important;
     }
     .flex-row{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
     }
  `
})
export class MnlFormHelperTextInputComponent extends FieldType<FieldTypeConfig> {
  checked = false;

  constructor(private cdr: ChangeDetectorRef){
    super()
  }

  toggleSlide(){
    this.checked = !this.checked;
    this.cdr.detectChanges();
  }

  showTextArea(){
    if(this.to['value']){
      if((this.to['scoring']['answer'].includes(this.to['value']))){
        return true;
      } else if((this.to['scoring']['answer'].includes(this.to['value']))&& this.checked) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
    
  }
}
