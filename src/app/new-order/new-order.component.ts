import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../_services/customer.service';
import { MatPaginator } from '@angular/material/paginator';
import { CartService } from '../_services/cart.service';
import { OrderService } from '../_services/order.service';
import { Cart } from '../_model/cart.model';
import { CartItem } from '../_model/cartItem.model';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit, AfterViewInit {
  customers: any[] = [];
  cart: any[] = [];
  selectedCustomer: any;
  totalCost: number = 0;
  products = new MatTableDataSource<any>();
  displayedColumns = [
    'id',
    'name',
    'price',
    'quantity',
    'actions'
  ];

  @ViewChild('cartTable') table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      {
        next: (response: any[]) => this.products.data = response,
        complete: () => console.log('Products loaded')
      }
    )

    this.customerService.getAllCustomers().subscribe(
      {
        next: (response: any[]) => this.customers = response
        ,
        complete: () => console.log('Customers loaded')

      }
    )
  }

  ngAfterViewInit() {
    this.products.paginator = this.paginator;
  }
  removeFromCart(product: any) {
    const index = this.cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.getTotalCost();
      this.table.renderRows();
    }
  }

  addToCart(product: any) {
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (!existingProduct && product.quantity > 0) {
      this.cart.push({ ...product, quantity: product.quantity });
    } else if (existingProduct && product.quantity > 0) {
      existingProduct.quantity = product.quantity;
    }

    this.getTotalCost();
    this.table.renderRows();
  }

  getTotalCost() {
    this.totalCost = 0;
    this.cart.forEach(item => {
      this.totalCost += item.price * item.quantity;
    }
    )
    return this.totalCost;
  }

  placeOrder() {

    const cart: Cart = {
      customerId: this.selectedCustomer.id,
      cartItems: {
        ...this.cart.map(item => {
          return {
            quantity: item.quantity,
            product: {
              id: item.id,
              name: item.name,
              price: item.price
            }
          }
        })
      },
      totalCost: this.getTotalCost()
    }

    console.log(cart);

    console.log(cart);
    this.cartService.addProductToCart(cart).subscribe(
      {
        next: (response: any) => {
          console.log(response);
          this.orderService.placeOrder(response).subscribe(
            {
              next: (response: any) => {
                console.log(response);
                this.cart = [];
                this.table.renderRows();
                this.getTotalCost();
                this.products.data.forEach((product: any) => {
                  product.quantity = 0;
                }
                )
              },
              error: (error: any) => console.log(error)
            }
          )
        }
      }
    );
  }

}
