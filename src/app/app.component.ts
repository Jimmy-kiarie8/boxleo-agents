import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Orders', url: '/orders', icon: 'cart' }
  ];
  public labels = ['Settings', 'About', 'Share'];
  constructor() {}
}
