import { ProductsService } from './../../core/services/products/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/iproducts';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop-by-brand',
  imports: [RouterLink,SearchPipe, FormsModule],
  templateUrl: './shop-by-brand.component.html',
  styleUrl: './shop-by-brand.component.scss'
})
export class ShopByBrandComponent implements OnInit {
  private readonly activatedRoute= inject(ActivatedRoute);
  private readonly productsService=inject(ProductsService);
  private readonly cartService=inject(CartService);
    private readonly toastrService=inject(ToastrService);
    private readonly wishlistService=inject(WishlistService);
    wishList:Iwishlist[]=[];
    products:IProduct[]=[];
    id:any='';
   private readonly spinnerService=inject(NgxSpinnerService);
   searchInput:string=''
     WishlistSubscription!: Subscription
     ProductsSubscrption!: Subscription

  name:any='';
  ngOnInit(): void {
  this.getIDandName();
  
  }


  getIDandName():void{
    this.spinnerService.show("CartLoad");
    this.activatedRoute.paramMap.subscribe({

      next:(res)=>{
      this.id=res.get("id");
      this.name=res.get("name");
      console.log( this.id);
      this.spinnerService.hide("CartLoad");
        this.getProducts();

      }
    })
  }


  getProducts():void{
    this.spinnerService.show("CartLoad");

    this.productsService.getAllProducts().subscribe({

      next:(res)=>{
        this.products=res.data;
        console.log(this.products )
        this.spinnerService.hide("CartLoad");
        this.checkWishlist();
        
      },
      
      error:(err)=>{
        console.log(err);
        this.spinnerService.hide("CartLoad");
      }

      


    })
  }
  addToCart(id:string):void{
    this.spinnerService.show("CartLoad");
     this.cartService.addProductToCart(id).subscribe({
      
  
      next:(res)=>{
        console.log(res);
        if(res.status==='success'){
          this.spinnerService.hide("CartLoad");
        this.toastrService.success(res.message,'Fresh Cart');
        this.cartService.cartNumber.set(res.numOfCartItems);
        console.log(this.cartService.cartNumber);
        }
      },
      error:(err)=>{
        console.log(err);
      }
  
  
     })
  }
  addTowishlist(id:string, i:number):void{
    this.spinnerService.show("CartLoad");
    this.wishlistService.addToWishlist(id).subscribe({
      next:(res)=>{
        if(res.status==="success")
        this.toastrService.success(res.message,'Fresh Cart');
        this.spinnerService.hide("CartLoad");
        this.products[i].isInWishlist= "text-red-600";
        console.log(res);
        
      }
    })
  }
  
  checkWishlist(){
    this.spinnerService.show("CartLoad");
   this.WishlistSubscription = this.wishlistService.getloggedUserCart().subscribe({
  
      next:(res)=>{
  
        this.wishList=res.data;
        for(let i=0; i<this.wishList.length;i++){
  
          for(let j=0 ; j<this.products.length;j++){
  
            if(this.wishList[i]._id===this.products[j]._id){
              this.products[j].isInWishlist= "text-red-600";
            }
  
          }
  
  
        }
        this.spinnerService.hide("CartLoad")
        }
  
  
  
    })
  }

}
