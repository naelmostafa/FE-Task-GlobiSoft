import { Component, OnInit } from '@angular/core';
import { Order } from '../_model/order.model';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss']
})
export class ShowOrdersComponent implements OnInit {
  orders!: Order[]
  displayedColumns: string[] = ['id', 'customer', 'createdDate','totalPrice' ];

  

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    if (!this.orders) {
      this.orderService.getAllOrders().subscribe(
        {
          next: (response) => this.orders = response as Order[],
          error: (error: any) => console.log(error),
          complete: () => console.log('complete')
        },
      )
    }
  }
}
