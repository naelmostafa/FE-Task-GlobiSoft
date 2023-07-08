import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss']
})
export class ShowProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productServices: ProductService) { }

  ngOnInit(): void {
    this.productServices.getAllProducts().subscribe(
      {
        next: (v: Product[]) => this.products = v,
        error: (error) => console.error(error)
      }
    )
  }


  deleteProduct(product: Product) {
    this.productServices.deleteProduct(product.id!).subscribe(
      (response: any) => {
        this.products.splice(this.products.indexOf(product), 1);
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  editProduct(product: Product) {
    this.productServices.updateProduct(product).subscribe((v) => console.info(v))
  }

}
