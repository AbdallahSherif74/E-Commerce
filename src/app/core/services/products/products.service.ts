import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpclient:HttpClient) { }

  getAllProducts():Observable<any>{
    return this.httpclient.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  getSpecificProducts(id:string):Observable<any>{
    return this.httpclient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
}
