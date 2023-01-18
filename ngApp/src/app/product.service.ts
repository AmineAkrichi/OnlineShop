import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './admin-space/product';

@Injectable({
  providedIn: 'root'
})



export class ProductService {

  

  private _listProductsUrl='http://localhost:3000/api/listProducts'
  private _listOneProductsUrl='http://localhost:3000/api//listOneProduct'
  private _addProductUrl="http://localhost:3000/api/addProduct"
  private _updateProductUrl="http://localhost:3000/api/updateProduct"
  private _deleteProductUrl="http://localhost:3000/api/deleteProduct"
  constructor(private http: HttpClient) { }

  listProducts() {
    return this.http.get<any>(this._listProductsUrl);
  }

  listOneProduct(product: any){
    return this.http.post(this._listOneProductsUrl,product)
  }

  addProduct(product: any){
    return this.http.post(this._addProductUrl,product)
  }

  updateProduct(upProduct:any){
    return this.http.post(this._updateProductUrl,upProduct)
  }

  deleteProduct(delProduct:any){
    return this.http.post(this._deleteProductUrl,delProduct)
  }

}
