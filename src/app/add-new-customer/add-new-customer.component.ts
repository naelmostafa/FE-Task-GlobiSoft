import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { Customer } from '../_model/customer.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.scss']
})
export class AddNewCustomerComponent implements OnInit {
  customer: Customer = {
    name: '',
    number: ''
  }


  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  addCustomer(customerForm: NgForm) {

    this.customerService.addCustomer(this.customer).subscribe(
      (response: Customer) => {
        customerForm.reset();
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    )

  }

}
