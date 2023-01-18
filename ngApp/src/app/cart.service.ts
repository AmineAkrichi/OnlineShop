import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _listCartUrl='http://localhost:3000/api/listCart'
  private _addCartUrl="http://localhost:3000/api/addToCart"
  private _deleteItemFromCartUrl='http://localhost:3000/api/deleteItemFromCart'
  
  constructor(private http : HttpClient) { }

  ListCart(user: any){
    return this.http.post<any>(this._listCartUrl,user);
  }

  addToCart(cart: any){
    return this.http.post<any>(this._addCartUrl,cart);
  }

  deleteItemFromCart(cart: any){
    return this.http.post<any>(this._deleteItemFromCartUrl,cart)
  }

}
