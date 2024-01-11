import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
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
  isMobile: boolean;
  constructor(private platform: Platform) {
    this.isMobile = this.platform.is('mobile');
  }
}
