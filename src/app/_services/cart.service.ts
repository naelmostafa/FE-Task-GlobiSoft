import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../_model/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  PATH_OF_API = 'http://localhost:8080/api/cart';

  constructor(private httpClient: HttpClient) { }

  public addProductToCart(cartItme: Cart) {
    return this.httpClient.post(this.PATH_OF_API + '/add', cartItme);
  }
}
