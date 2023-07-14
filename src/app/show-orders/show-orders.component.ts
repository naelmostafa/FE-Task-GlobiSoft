import { Component, OnInit } from '@angular/core';
import { Order } from '../_model/order.model';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss']
})
export class ShowOrdersComponent implements OnInit{
  orders!: Order[]

  constructor() { }
  
  ngOnInit(): void {
  }



}
