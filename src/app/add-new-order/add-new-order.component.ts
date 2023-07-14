import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../_services/customer.service';
import { MatPaginator } from '@angular/material/paginator';
import { CartService } from '../_services/cart.service';
import { OrderService } from '../_services/order.service';
import { Cart } from '../_model/cart.model';

@Component({
  selector: 'app-add-new-order',
  templateUrl: './add-new-order.component.html',
  styleUrls: ['./add-new-order.component.scss']
})
export class AddNewOrderComponent implements OnInit, AfterViewInit {
  customers: any[] = [];
  cart: any[] = [];
  selectedCustomer: any;
  totalCost: number = 0;
  successMessage: string = '';
  errorMessage: string = '';
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
    // check if selected customer is valid
    if (!this.selectedCustomer) {
      this.errorMessage = 'Please select a customer';
      return;
    }
    const cart: Cart = {
      customerId: this.selectedCustomer.id,
      cartItems: [
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
      ],
    }


    this.cartService.addProductToCart(cart).subscribe(
      {
        next: (response: any) => {
          console.log(response[0].customer);
          this.orderService.placeOrder(response[0].customer).subscribe(
            {
              next: (response: any) => {
                this.successMessage = 'Order placed successfully';
                this.errorMessage = '';
                this.cart = [];
                this.table.renderRows();
                this.products.data.forEach((product: any) => {
                  product.quantity = 0;
                }
                )
              },
              error: (error: any) => {
                this.errorMessage = 'Order failed to place';
                this.successMessage = '';
              }
            }
          )
        },
        error: (error: any) => {
          this.errorMessage = 'Order failed to place';
          this.successMessage = '';
        }
      }
    );
  }

}
