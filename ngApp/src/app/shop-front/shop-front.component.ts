import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import {MatDialog} from '@angular/material/dialog';
import { ProductDialogComponent } from "../components/product-dialog/product-dialog.component";

@Component({
  selector: 'app-shop-front',
  templateUrl: './shop-front.component.html',
  styleUrls: ['./shop-front.component.css']
})
export class ShopFrontComponent implements OnInit {
  
  constructor(private _productService: ProductService , private _authGard: AuthGuard ,private _authService: AuthService,private _catService: CartService, public dialog:MatDialog) { }
  products:any=[];
  ngOnInit(): void {
    this._productService.listProducts()
      .subscribe(
        res=> {
                this.products=res
                //console.log(this.products)
              },
      )
  }

  addToShopingCart(ProductId: any){
    if (this._authGard.canActivate()) {
      let newCart= JSON.parse('{"userId": "'+JSON.parse(sessionStorage.getItem('LoggedInUser')|| '{}')._id+'","products":[{"productCode":"'+ProductId+'","quantity":1}]}'||'{}')
      //console.log(newCart);
      
      this._catService.addToCart(newCart)
        .subscribe(
          res=> console.log(res),
          err=> console.log(err)
        )
    }
  }

  openProductPage(product:any){
    console.log(product);
    const dialogRef = this.dialog.open(ProductDialogComponent,{data: {code: product?.code, description: product?.description , category: product?.category, name: product?.name,price: product?.price,imageUrl:product?.imageUrl}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addToShopingCart(product._id)
      }  
    }); 
  }

}
