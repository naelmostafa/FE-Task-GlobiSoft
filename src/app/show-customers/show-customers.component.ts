import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../_model/customer.model';
import { CustomerService } from '../_services/customer.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-show-customers',
  templateUrl: './show-customers.component.html',
  styleUrls: ['./show-customers.component.scss']
})
export class ShowCustomersComponent implements OnInit {
  customers: Customer[] = [];
  displayedColumns: string[] = ['id', 'name', 'number', 'actions'];

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe(
      {
        next: (response: Customer[]) => {
          this.customers = response;
          console.log(response);
        },
        error: (error: any) => console.log(error),

        complete: () => console.log('complete')
      },
    )
  }

  deleteCustomer(customer: Customer) {
    console.log(customer);
    this.customerService.deleteCustomer(customer.id!).subscribe({
      next: (v) => {
        console.log(v);
        this.customers.splice(this.customers.indexOf(customer), 1);
        this.table.renderRows();
      },
      error: (error: any) => console.log(error),
      complete: () => console.log('complete')
    },

    )

  }

  editCustomer(customer: Customer) {
    this.customerService.updateCustomer(customer).subscribe(
      {
        next: (v) => this.table.renderRows(),
        error: (error) => console.error(error),
        complete: () => console.log('Completed')
      }
    )
  }

}
