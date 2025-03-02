import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  constructor(private httpClient:HttpClient) { }




  getAllSubcats():Observable<any>{
    return this.httpClient.get("https://ecommerce.routemisr.com/api/v1/subcategories");
  }
}
