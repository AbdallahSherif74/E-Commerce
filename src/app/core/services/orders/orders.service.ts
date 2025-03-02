import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpclient:HttpClient) { }


  checkoutSession(id:string , data:object):Observable<any>{
    return this.httpclient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,



      {
        "shippingAddress":data
    },

    
    {
      headers:{
        token:localStorage.getItem("userToken")!
      }
    }
    )

  }

}
