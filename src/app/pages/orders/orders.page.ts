import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, Platform } from '@ionic/angular';
import { CreatePage } from './create/create.page';
import { ShowPage } from './show/show.page';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  // @ViewChild(IonModal) modal: IonModal;



  formData = {
    comment: ''
  }

  orders: any;

  sortDirection = 0;
  sortKey = null;
  page = 1;
  totalPages = 3;
  resultCount = 10;
  isMobile: boolean;
  totalResults = 0;
  last_page = 0;
  per_page = 0;
  from = 0;
  to = 0;

  constructor(private modalCtrl: ModalController, private router: Router, private platform: Platform, private orderService: OrderService) {
    this.isMobile = this.platform.is('mobile');
  }


  presentingElement: any;

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    this.getOrders()
  }

  nextPage() {
    if (this.page < this.last_page) {
      this.page++
      this.getOrders()
    }
  }
  prevPage() {
    if (this.page > 1) {
      this.page--
      this.getOrders()
    }
  }
  goFirst() {
    this.page = 1
    this.getOrders()
  }
  goLast() {
    this.page = this.last_page;

    this.getOrders()
  }

  sortBy(key: any) {
    this.sortKey = key;
    this.sortDirection++;
    this.sort()
  }
  sort() {
    if (this.sortDirection == 1) {
      // this.orders = this.orders.sort((a,b) => {
      //   const valA = a[this.sortKey];
      //   const valB = b[this.sortKey];
      //   return valA.locacaleCompare(valB);
      // });

    } else if (this.sortDirection == 2) {

    } else if (this.sortDirection == 3) {

    } else if (this.sortDirection == 4) {

    } else {
      this.sortDirection = 0;
      this.sortKey = null;
    }

  }
  gotToCreate() {
    this.router.navigate(['orders/create']);
  }

  gotToUpdate() {
    this.router.navigate(['order-update', 1]);
  }
  async modal() {
    const modal = await this.modalCtrl.create({
      component: CreatePage,
      // componentProps: { id },
      breakpoints: [0, 1],
      initialBreakpoint: 0.9
    });
    modal.present();
  }

  getOrders() {
    console.log("🚀 ~ OrdersPage ~ getOrders ~ this.resultCount:", this.resultCount)
    let page_ = this.page;
    const url = "orders?page=" + page_ + "&limit=" + this.resultCount;
    this.orderService.getItem(url).subscribe((res) => {
      console.log("🚀 ~ OrdersPage ~ this.orderService.getItem ~ res:", res)
      this.orders = res.data;
      this.totalPages = res.meta.last_page
      this.totalResults = res.meta.total
      this.page = res.meta.current_page
      this.per_page = res.meta.per_page
      this.last_page = res.meta.last_page
      this.from = res.meta.from
      this.to = res.meta.to
    })
  }

  async show(order: any, type: any) {
    const modal = await this.modalCtrl.create({
      component: ShowPage,
      componentProps: { order, type },
      breakpoints: [0, 0.9],
      initialBreakpoint: 0.7
    });
    modal.present();
  }

}
