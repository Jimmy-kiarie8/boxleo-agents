import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  // @Input() id: any;
  form!: FormGroup;
  form1!: FormGroup;
  form2!: FormGroup;
  step = '1'; // Default to first step

  senderData: any[] = [];
  receiverData: any[] = [];
  orderData: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.loadSenderData();
    this.loadReceiverData();
    this.loadOrderData();
  }



  loadSenderData() {
    this.http.get<any[]>('../../../assets/data/sender.json').subscribe(data => {
      this.senderData = data;
      this.createForm(data, 1);
    });
  }

  loadReceiverData() {
    this.http.get<any[]>('../../../assets/data/receiver.json').subscribe(data => {
      this.receiverData = data;
      this.createForm(data, 2);
    });
  }
  loadOrderData() {
    this.http.get<any[]>('../../../assets/data/sales.json').subscribe(data => {
      this.orderData = data;
      this.createForm(data, 3);
    });
  }


  createForm(data: any, formNo: number) {
    const group: { [key: string]: any } = {}; // Define the type of 'group' as an object with string keys and any type of values
    data.forEach((field: { display: any; model: string | number; }) => {
      if (field.display) {
        group[field.model] = ['']; // Now TypeScript knows that 'group' is an object with string keys
      }
    });

    if (formNo == 1) {
      this.form = this.fb.group(group);
    } else if(formNo == 2) {
      this.form1 = this.fb.group(group);
    } else if(formNo == 3) {
      this.form2 = this.fb.group(group);
    }
  }


}
