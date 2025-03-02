import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   router=inject(Router)
    private readonly authService=inject(AuthService);
    isloading:boolean=false;
    errorMessage:string='';
    IsSuccess:boolean=false;
    loginform:FormGroup = new FormGroup({
      
      email:new FormControl(null,[Validators.required, Validators.email]),
      password:new FormControl(null,[Validators.required]),
     
  
    });
  
  
 
  
    submitForm():void{
      if(this.loginform.valid){
  
        this.isloading=true;
        this.authService.sendLoginForm(this.loginform.value).subscribe(
         {
           next:(res)=>{
            
             this.IsSuccess=true;

             
             
             setTimeout(() => {
               if(res.message==='success'){
                 localStorage.setItem('userToken' , res.token);
                 this.authService.saveUserData();
                 
                 this.router.navigate(['/home']);
                }
                
              }, 2000);
              
              this.isloading=false;
            },
           error:(err)=>{
             console.log(err);
             this.errorMessage=err.error.message;
             ;
             
            this.isloading=false;  
           }
     
         }
     
     
        )
      }
    }

}
