import { MyTranslateService } from './../../core/services/MyTranslate/my-translate.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproducts';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [FormsModule , CarouselModule, SearchPipe, RouterLink,TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone:true
})
export class HomeComponent implements OnInit , OnDestroy{
  private readonly productsService=inject(ProductsService) ;
  private readonly categoryService=inject(CategoriesService) ;
  private readonly cartService=inject(CartService);
  private readonly wishlistService=inject(WishlistService);
  private readonly toastrService=inject(ToastrService);
  private readonly ngxSpinnerService=inject(NgxSpinnerService);
  private readonly myTranslateService=inject(MyTranslateService);
  wishlistSubsscription!:Subscription;
  productsSubsscription!:Subscription;
  products:IProduct[]=[]
  categories:ICategory[]=[]
  cartNumber:number=0;
  isaddedtowishlist=false;
  searchInput:string='';
  style:string='';
  wishList:Iwishlist[]=[];

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    rtl:true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3500,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    autoplay:true,
    autoplayTimeout:2000,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-regular fa-circle-left text-green-500"></i>', '<i class="fa-regular fa-circle-right text-green-500"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  allProductsSubscribe(){
    this.ngxSpinnerService.show();
    this.productsSubsscription= this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        
        this.products=res.data;
        this.checkWishlist();
        this.ngxSpinnerService.hide();
      },
      error:(err)=>{
        console.log(err)
      }

  })

  }

  getAllCategoriesData(){
    this.ngxSpinnerService.show();
    this.categoryService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data)
       this.categories=res.data

       this.ngxSpinnerService.hide();
      },
      error:(err)=>{
        console.log(err)
      }
    }

    )

  }
  ngOnInit(): void {
    this.allProductsSubscribe();
    
   this.getAllCategoriesData();
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

  addTowishlist(id:string, i:number):void{
    this.ngxSpinnerService.show("CartLoad");
    this.wishlistService.addToWishlist(id).subscribe({
      next:(res)=>{
        if(res.status==="success")
          this.toastrService.success(res.message,'Fresh Cart');
        this.ngxSpinnerService.hide("CartLoad");
        this.products[i].isInWishlist= "text-red-600";
        console.log(res);
        this.style= "color:red";
      }
    })
  }
  checkWishlist(){
   this.wishlistSubsscription= this.wishlistService.getloggedUserCart().subscribe({

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
    this.wishlistSubsscription.unsubscribe();
    this.productsSubsscription.unsubscribe();
  }
 
}
