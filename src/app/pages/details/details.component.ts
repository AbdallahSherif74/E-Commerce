import { IProduct } from './../../shared/interfaces/iproducts';
import { ProductsService } from './../../core/services/products/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly cartService= inject(CartService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService= inject(ProductsService);
  private readonly toastrService=inject(ToastrService);
  private readonly ngxSpinnerService=inject(NgxSpinnerService);
  productID:any;
  productDetails:IProduct ={} as IProduct ;
   
  detailsSlider: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      autoplay:false,
      autoplayTimeout:3500,
      dots: true,
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
    
    

  ngOnInit():void{
    this.ngxSpinnerService.show();
    
      this.activatedRoute.paramMap.subscribe(

        {
          next:(res)=>{
            this.productID=res.get("id")
            this.productsService.getSpecificProducts(this.productID).subscribe({

                next:(res)=>{
                  this.productDetails=res.data;
                  console.log(res.data);
                  this.ngxSpinnerService.hide();
                },
                error:(err)=>{
                  console.log(err);
                }



            });
          

          },
          error:(err)=>{
            console.log(err);
          }
        }



      )


  }

    addTocart():void{
      this.cartService.addProductToCart(this.productID).subscribe(
        {
          next:(res)=>{
            
          if(res.status==='success'){
            this.toastrService.success(res.message,'Fresh Cart');


          }


          },

          error:(err)=>{
            console.log(err);



          },
           


        }
          
        
      )
    }

}
