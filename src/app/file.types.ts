import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'formly-field-file',
  standalone: true,
  imports: [FormlyModule, MatButtonModule, MatInputModule, MatSelectModule, MatIconModule , MatFormFieldModule, FormsModule, ReactiveFormsModule],
  template: `
    <input type="file" [formControl]="formControl" [formlyAttributes]="field" />
    `,
})
export class FormlyFieldFile extends FieldType<FieldTypeConfig> {

}


/**  Copyright 2021 Formly. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://github.com/ngx-formly/ngx-formly/blob/main/LICENSE */