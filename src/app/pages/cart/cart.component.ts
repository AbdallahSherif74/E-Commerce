import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService=inject(CartService);
  private readonly ngxSpinnerService=inject(NgxSpinnerService);
  cartCount:number=0;
  cardDetails:ICart= {} as ICart;
  hidden:boolean=true

  ngOnInit(): void {
    this.displayAllCartData();
    
  }
  togglehidden():void{
    this.hidden=!this.hidden;
  }

  displayAllCartData():void{
    this.ngxSpinnerService.show();
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cardDetails=res.data;
        this.ngxSpinnerService.hide();
        this.cartService.cartNumber.set(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

clearcart():void{
  this.cartService.cleartheCart().subscribe({
    next:(res)=>{
      console.log(res);
      this.displayAllCartData();
      this.cartService.cartNumber.set(res.numOfCartItems);
      this.hidden=!this.hidden;
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

  removeItemFromCart(id:string):void{
    this.cartService.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
         console.log(res);
         this.cardDetails=res.data;
         this.cartService.cartNumber.set(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err);
      }

    })

  }


  countUpdater(id:string, newCount:number):void{

    this.cartService.updateProdQuantity(id,newCount).subscribe({
      next:(res)=>{
      this.cardDetails=res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
