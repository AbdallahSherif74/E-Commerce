import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{

  private readonly wishlistService= inject(WishlistService);
  userToken:string=localStorage.getItem("userToken")!
  private readonly cartService=inject(CartService);
  private readonly ngxSpinnerService=inject(NgxSpinnerService);
  private readonly toastrService=inject(ToastrService);
  wishlist:Iwishlist[]=[];
  flag:boolean=false;
  ngOnInit(): void {
    this.getUserWishlist();
  }

  addToCart(id:string):void{
    this.ngxSpinnerService.show("CartLoad");
     this.cartService.addProductToCart(id).subscribe({
      

      next:(res)=>{
        console.log(res);
        if(res.status==='success'){
          this.ngxSpinnerService.hide("CartLoad");
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
  getUserWishlist():void{
    this.ngxSpinnerService.show("CartLoad");
   

      this.wishlistService.getloggedUserCart().subscribe({
        next:(res)=>{
          this.wishlist=res.data;
          this.ngxSpinnerService.hide("CartLoad");
          console.log(res.data);
          if(this.wishlist.length>0){
            this.flag=true;
          }

        }
      })
    

  }
  removeFromWishlist(id:string):void{

    this.wishlistService.removeFromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.getUserWishlist();
        if(res.data.length===0){
          this.flag=false;

        }
      }
    })

  }

}
