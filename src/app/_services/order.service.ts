import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../_model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  PATH_OF_API = 'http://localhost:8080/api/order';

  constructor(private httpClient: HttpClient) { }

  public placeOrder(customer: Customer) {
    return this.httpClient.post(this.PATH_OF_API + '/place-order', customer);
  }
  
}
