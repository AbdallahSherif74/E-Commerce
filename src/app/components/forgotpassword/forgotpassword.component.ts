import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  stage:number= 1;
  isLoading:boolean=false;
  redirecting:boolean=false;
  private readonly router= inject(Router);
  private readonly authservice= inject(AuthService);
  errorMessage:string='';
  verifyEmail: FormGroup = new FormGroup({


    email: new FormControl(null, [Validators.required, Validators.email])
  });

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{2,}$/)])

  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),

  });



  stage1():void{
    this.isLoading= true;
    this.authservice.emailVerify(this.verifyEmail.value).subscribe({
      
      next:(res)=>{
        console.log(res);
        if(res.statusMsg==='success'){
          this.stage= 2;
          this.errorMessage='';
        }
        this.isLoading= false;
      },

      error:(err)=>{
        console.log(err);
        this.isLoading= false;
        this.errorMessage=err.error.message;
      }
    })
  }

  stage2():void{
    this.isLoading= true;
    this.errorMessage='';
    this.authservice.codeVerify(this.verifyCode.value).subscribe({
    
      next:(res)=>{
        console.log(res);
        if(res.status==='Success'){
          this.stage= 3;
          this.errorMessage='';
        }
        this.isLoading= false;
      },

      error:(err)=>{
        this.isLoading= false;
        console.log(err);
        this.errorMessage=err.error.message;
      }
    })
  }

  stage3():void{
    this.isLoading= true;
    this.errorMessage='';
    this.authservice.resetPass(this.resetPassword.value).subscribe({
      
      next:(res)=>{
        
        
        
        this.isLoading= false;
        
        this.redirecting=true;
        
        setTimeout(()=>{
          localStorage.setItem("userToken", res.token);
          this.authservice.saveUserData;
          this.router.navigate(['/home']);
          
        },2000);



      },

      error:(err)=>{
        console.log(err);
        this.errorMessage=err.error.message;
        
        this.isLoading= false;
      }
    })
  }

}
