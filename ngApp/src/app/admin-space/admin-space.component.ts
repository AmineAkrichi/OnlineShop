import { Component, OnInit,ViewChild,Inject } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { UpdateDialogComponent} from "../components/update-dialog/update-dialog.component";
import { CreateDialogComponent} from "../components/create-dialog/create-dialog.component";
import {MatSort} from '@angular/material/sort';
import { ProductService } from '../product.service';
import { Product } from './product';


let index;
@Component({
  selector: 'app-admin-space',
  templateUrl: './admin-space.component.html',
  styleUrls: ['./admin-space.component.css']

})

export class AdminSpaceComponent implements OnInit {

  constructor(public dialog: MatDialog, private _productService: ProductService) { }
  newProduct!:Product;
  products:any=[]
  dataSource = new MatTableDataSource<Product>;
  
  ngOnInit(): void {
    this._productService.listProducts()
      .subscribe(
        res=> {
                this.products=res,
                console.log(this.products)
                this.dataSource = new MatTableDataSource(this.products);
                this.ngAfterViewInit();
              },
      ) 
    
  }


  displayedColumns: string[] = ['Image','Code', 'Name','Description','Category', 'Price','Action'];
  
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

   /* if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }*/
  }
  
  deleteProduct(element:any){
  
    this._productService.deleteProduct(element)
          .subscribe(
            res=>{console.log(res),this.ngOnInit()},
            err=>console.log(err)
          )
    
  }

  updateProduct(element:any){
    const dialogRef = this.dialog.open(UpdateDialogComponent,{data: {code: element.code, description: element.description, category: element.category, name: element.name, price: element.price, imageUrl: element.imageUrl}});
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      if (result) {
        this._productService.updateProduct(result)
          .subscribe(
            res=>{console.log(res),this.ngOnInit()},
            err=>console.log(err)
          )
      }
    }); 
  }

  addProduct(){
    const dialogRef = this.dialog.open(CreateDialogComponent,{data: {code: this.newProduct?.code, description: this.newProduct?.description , category: this.newProduct?.category, name: this.newProduct?.name,price: this.newProduct?.price,imageUrl:this.newProduct?.imageUrl}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      if (result) {
        this._productService.addProduct(result)
          .subscribe(
              res=>{console.log(res),this.ngOnInit()},
              err=>console.log(err)
              
          )
      }  
    }); 
  }
}

