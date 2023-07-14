import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../_model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  PATH_OF_API = 'http://localhost:8080/api/customer';

  constructor(private httpClient: HttpClient) { }

  public getAllCustomers() {
    return this.httpClient.get<Customer[]>(this.PATH_OF_API + '/all');
  }

  public getCustomerById(id: number) {
    return this.httpClient.get<Customer>(this.PATH_OF_API + '/' + id);
  }

  public addCustomer(customer: Customer) {
    return this.httpClient.post<Customer>(this.PATH_OF_API + '/add', customer);
  }

  public updateCustomer(customer: Customer) {
    return this.httpClient.put<Customer>(this.PATH_OF_API + '/update', customer);
  }

  public deleteCustomer(id: number) {
    return this.httpClient.delete(this.PATH_OF_API + '/delete/' + id);
  }

}
