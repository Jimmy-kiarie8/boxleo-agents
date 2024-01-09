import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreatePage } from './create/create.page';
import { ShowPage } from './show/show.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orders = [
    {
      id: 1,
      client: { name: 'Client 1', phone: '453-169-5045' },
      delivery_date: new Date('2023-03-08'),
      order_no: 'ORD001',
      total_price: '359.00'
    },
    {
      id: 2,
      client: { name: 'Client 2', phone: '237-512-7603' },
      delivery_date: new Date('2023-07-21'),
      order_no: 'ORD002',
      total_price: '154.00'
    },
    {
      id: 3,
      client: { name: 'Client 3', phone: '699-808-3263' },
      delivery_date: new Date('2023-01-20'),
      order_no: 'ORD003',
      total_price: '63.00'
    },
    {
      id: 4,
      client: { name: 'Client 4', phone: '988-636-3627' },
      delivery_date: new Date('2023-08-30'),
      order_no: 'ORD004',
      total_price: '260.00'
    },
    {
      id: 5,
      client: { name: 'Client 5', phone: '272-923-6188' },
      delivery_date: new Date('2023-12-08'),
      order_no: 'ORD005',
      total_price: '312.00'
    },
    {
      id: 6,
      client: { name: 'Client 6', phone: '499-865-5356' },
      delivery_date: new Date('2023-05-23'),
      order_no: 'ORD006',
      total_price: '456.00'
    },
    {
      id: 7,
      client: { name: 'Client 7', phone: '480-456-5261' },
      delivery_date: new Date('2023-10-10'),
      order_no: 'ORD007',
      total_price: '475.00'
    },
    {
      id: 8,
      client: { name: 'Client 8', phone: '209-877-1681' },
      delivery_date: new Date('2023-01-12'),
      order_no: 'ORD008',
      total_price: '496.00'
    },
    {
      id: 9,
      client: { name: 'Client 9', phone: '496-710-6069' },
      delivery_date: new Date('2023-11-10'),
      order_no: 'ORD009',
      total_price: '185.00'
    },
    {
      id: 10,
      client: { name: 'Client 10', phone: '763-418-6057' },
      delivery_date: new Date('2023-05-10'),
      order_no: 'ORD010',
      total_price: '212.00'
    }
  ];

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
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


  async show(order: any) {
    const modal = await this.modalCtrl.create({
      component: ShowPage,
      componentProps: { order },
      breakpoints: [0, 0.9],
      initialBreakpoint: 0.7
    });
    modal.present();
  }
}
