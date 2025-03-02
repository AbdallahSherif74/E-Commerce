import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  
  constructor(private httpclient:HttpClient) { }

  cartNumber:WritableSignal<number>=signal(0);

  addProductToCart(data:string):Observable<any>{
    return this.httpclient.post("https://ecommerce.routemisr.com/api/v1/cart",
    {
      "productId": data
    },
    {
      headers:{
        token:localStorage.getItem("userToken")!
      }
    }
)
  }


  getLoggedUserCart():Observable<any>{
    return this.httpclient.get('https://ecommerce.routemisr.com/api/v1/cart',
      {
        headers:{
          token:localStorage.getItem('userToken')!
        }
      }
    )
  }

  removeSpecificCartItem(id:string):Observable<any>{
    return this.httpclient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,

      {
        headers:{
          token:localStorage.getItem('userToken')!
        }
      }
    );
  }

  updateProdQuantity(id:string, newCount:number):Observable<any>{
    return this.httpclient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
      {
        "count": newCount
    },
    {
      headers:{
      token:localStorage.getItem('userToken')!
    }
  }
    )
  }



  cleartheCart():Observable<any>{
    return this.httpclient.delete("https://ecommerce.routemisr.com/api/v1/cart",

      {
        headers:{
          token:localStorage.getItem("userToken")!
        }
      }
    )
  }




 
}
