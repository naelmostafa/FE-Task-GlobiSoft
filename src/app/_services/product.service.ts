import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  PATH_OF_API = 'http://localhost:8080/api/product';

  constructor(private httpClient: HttpClient) { }

  public addProduct(product: Product) {
    return this.httpClient.post<Product>(this.PATH_OF_API + '/add', product);
  }

  public updateProduct(product: Product) {
    return this.httpClient.put<Product>(this.PATH_OF_API + '/update', product);
  }

  public getAllProducts() {
    return this.httpClient.get<Product[]>(this.PATH_OF_API + '/all');
  }

  public getProductById(id: number) {
    return this.httpClient.get<Product>(this.PATH_OF_API + '/' + id);
  }


  public deleteProduct(id: number) {
    return this.httpClient.delete(this.PATH_OF_API + '/delete/' + id);
  }

}
