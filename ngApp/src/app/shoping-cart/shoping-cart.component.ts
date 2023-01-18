import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {

  constructor(private _cartService: CartService , private _productService: ProductService) { }
  cart:any=[];
  productQuantity:any;
  totalPrice=0;
  dataSource = new MatTableDataSource<any>;
  loggedInUser=JSON.parse(sessionStorage.getItem('LoggedInUser')|| '{}');
  ngOnInit(): void {
    this._cartService.ListCart(this.loggedInUser)
      .subscribe (
        res => {
          this.productQuantity=[];
          for (let index = 0; index < res.products.length; index++) {
            const element = res.products[index];
            this._productService.listOneProduct(element)
              .subscribe(
                res=> { 
                        //console.log(element);
                        //console.log(res);             
                        this.cart.push(res),
                        this.dataSource = new MatTableDataSource(this.cart)   
                        this.ngAfterViewInit()               
                      }
              )
            this.productQuantity.push(element.quantity)
          }
          //console.log(this.dataSource.data)
          //console.log(this.productQuantity)
          //this.ngAfterViewInit()
        }
      )
  }

  displayedColumns: string[] = ['Image','Code', 'Name', 'Quantity','Price','Action'];
  
  
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    for (let index = 0; index < this.dataSource.data.length; index++) {
      console.log(this.totalPrice);
      this.totalPrice+= this.dataSource.data[index].price*this.productQuantity[index];
      console.log(this.totalPrice);
      
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deteteItemFromCart(element:any){
    
    let DelCartItem=JSON.parse('{ "userId" : "'+JSON.parse(sessionStorage.getItem('LoggedInUser')|| '{}')._id+'" , "ProductId":"'+element._id+'"}'||'{}')
    console.log(DelCartItem);
    this._cartService.deleteItemFromCart(DelCartItem)
      .subscribe(
        res=> {console.log(res),
                location.reload()}
      )
  }

}
