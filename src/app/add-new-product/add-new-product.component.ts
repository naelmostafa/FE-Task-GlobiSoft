import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0
  }

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  addProduct(prductForm: NgForm) {

    this.productService.addProduct(this.product).subscribe(
      (response: Product) => {
        prductForm.reset();
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    )

  }
}
