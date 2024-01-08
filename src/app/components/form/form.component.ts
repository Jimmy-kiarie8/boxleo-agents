import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


interface Field {
  model: string;
  type: string;
  label: string;
  items?: any[]; // Define more specifically if possible
  // Add other relevant properties
}


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent  implements OnInit {
  @Input() fields: any[] = [];

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const group: {[key: string]: any} = {};
    this.fields.forEach(field => {
      group[field.model] = this.fb.control('');
    });
    this.form = this.fb.group(group);
  }

}
