import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproducts';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { NgxSpinner, NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [FormsModule, SearchPipe, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy{
  private readonly productsService= inject(ProductsService);
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);
  private readonly wishlistService=inject(WishlistService);
  wishList:Iwishlist[]=[];
  products:IProduct[]=[];
  searchInput:string='';
  style:string="";
  WishlistSubscription!: Subscription
  ProductsSubscrption!: Subscription
  
  private readonly spinnerService=inject(NgxSpinnerService);
  i:number=0
ngOnInit(): void {
  this.productsDisplay();
  

}

productsDisplay():void{
  this.spinnerService.show('CartLoad');
  this.ProductsSubscrption= this.productsService.getAllProducts().subscribe({
  

    next:(res)=>{
      this.products=res.data;
      this.spinnerService.hide('CartLoad');
      this.checkWishlist();
    },

    error:(err)=>{
      console.log(err);
      this.spinnerService.hide('CartLoad');
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

      }



  })
}
ngOnDestroy(): void {
  this.WishlistSubscription.unsubscribe();
  this.ProductsSubscrption.unsubscribe();
}

}
