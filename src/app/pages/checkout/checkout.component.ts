import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  cartID:string='';

  orderservice=inject(OrdersService);
  private readonly activatedroute=inject(ActivatedRoute)

    checkoutForm:FormGroup=new FormGroup({
      details: new FormControl(null,[Validators.required]),
      phone: new FormControl (null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
      
      city: new FormControl(null,[Validators.required])


    })
    ngOnInit(): void {
      this.getcartid();
    }
  

  getcartid():void{
    this.activatedroute.paramMap.subscribe({
      next:(param)=>{
        this.cartID= param.get('id')!;
      },

      error:(err)=>{
        console.log(err);

      }
    })
  }

  submitform():void{

    console.log(this.checkoutForm.value);
    if(this.checkoutForm.valid){

      this.orderservice.checkoutSession(this.cartID,this.checkoutForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.status==='success'){
          open(res.session.url, '_self');
        }},
        error:(err)=>{
          console.log(err);
        }
      
      })
    }
    else {
      this.checkoutForm.markAllAsTouched();
    }


  }
}
