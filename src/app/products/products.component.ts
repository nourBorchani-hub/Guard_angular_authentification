import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationServiceService } from '../services/authentication-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products! :Array <Product> ;
  currentPage :number =0 ;
  pageSize:number =5 ;
  totalPage:number =0 ;
  searchFormGroup !:FormGroup ;
  currentAction :string ="all";
  constructor(private prodService:ProductService,private fb:FormBuilder,public authServ :AuthenticationServiceService){

  }
  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword :this.fb.control(null)
    });
  
    this.handleGetPAgeProducts();
  }
  handleGetAllProducts(){
    console.log("Récupérer la liste des produits");
    this.prodService.getAllProducts().subscribe({
      next: data => {
        console.log("Succès GET");
        this.products = data;
      },
      error: err => {
        console.log("Erreur GET");
      }
    });
  }
  handleGetPAgeProducts(){
 
    this.prodService.getPageProducts(this.currentPage ,this.pageSize).subscribe({
      next: data => {
        console.log("Succès GET");
        this.products = data.products;//récuperer la liste produit 
        this.totalPage=data.totalPage;// récupere la liste page 
      },
      error: err => {
        console.log("Erreur GET");
      }
    });
  }
  
  handleDeleteProduct(p:any)
{
  let conf=confirm("are you sure ??");
  if(conf ==false) return ;
this.prodService.DeleteProduct(p.id).subscribe({

    next: data => {
      console.log("Succès GET");
    //  this.handleGetAllProducts ();
    let index =this.products.indexOf(p);
    this.products.splice(index,1);
    },
    error: err => {
      console.log("Erreur GET");
    }
  });
}
handlesetPromotion(p:Product){
  let promo=p.promotion;
  this.prodService.setPromotion(p.id).subscribe( {
     next :(data) =>{
      console.log("ok");
      p.promotion= !promo;

     },
     error: err => {
      console.log("Erreur GET");
    }
     
  })
}
handleSearchProducts(){
  this.currentAction="search";
  this.currentPage =0;
  let keyword=this.searchFormGroup.value.keyword;
  this.prodService.searchProducts(keyword,this.currentPage ,this.pageSize).subscribe({
    next :(data) =>{
   this.products=data.products;
   this.totalPage =data .totalPage;

     },
     error: err => {
      console.log("Erreur GET");
    }
  })

}
gotoPage(i:number){
  this.currentPage=i;
  if(this.currentAction =='all')
  this.handleGetPAgeProducts();
 else 
 this.handleSearchProducts();
}
}
