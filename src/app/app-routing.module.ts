import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowProductsComponent } from './show-products/show-products.component';
import { ShowCustomersComponent } from './show-customers/show-customers.component';
import { AddNewCustomerComponent } from './add-new-customer/add-new-customer.component';
import { NewOrderComponent } from './new-order/new-order.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'add-product', component: AddNewProductComponent },
  { path: 'products', component: ShowProductsComponent },
  { path: 'add-customer', component: AddNewCustomerComponent },
  { path: 'customers', component: ShowCustomersComponent },
  { path: 'new-order', component: NewOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
