import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {
  @Input() order: any;
  @Input() type: any;

  formData = {
    comment: ''
  }
  statuses = ['Returned', 'Delivered', 'Scheduled', 'Dispatched', 'Cancelled'];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  async comment() {
    const url = `order/comment/${this.order.id}`;
    this.orderService.postItem(this.formData, url).subscribe((res) => {
      console.log("🚀 ~ OrdersPage ~ this.orderService.getItem ~ res:", res)
    })
  }
}
