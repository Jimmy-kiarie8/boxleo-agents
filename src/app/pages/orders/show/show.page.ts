import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {
  @Input() order: any;

  constructor() { }

  ngOnInit() {
  }

}
