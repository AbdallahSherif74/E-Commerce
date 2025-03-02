import { Router } from '@angular/router';

import { jwtDecode } from './../../../../../node_modules/jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly router = inject(Router)

  userData: any = null;
  constructor(private httpClient: HttpClient) { }
  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data);
  }
  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data);
  }


  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);


    }
  }

  logOut(): void {

    localStorage.removeItem('userToken');
    this.userData = null;
    this.router.navigate(['/login']);

  }


  emailVerify(data: object): Observable<any> {

    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', data)

  }


  codeVerify(data: object): Observable<any> {

    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', data)

  }


  resetPass(data: object): Observable<any> {

    return this.httpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', data)

  }

}


