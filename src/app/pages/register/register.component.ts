import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  router=inject(Router)
  private readonly authService=inject(AuthService);
  isloading:boolean=false;
  errorMessage:string='';
  IsSuccess:boolean=false;
  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.minLength(8), Validators.required, Validators.maxLength(20)]),
    email:new FormControl(null,[Validators.required, Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0-2,5][0-9]{8}$/)])

  }, {validators:this.confirmPassword});


  confirmPassword(g:AbstractControl){
    const password = g.get('password')?.value;
    const rePassword=g.get('rePassword')?.value;
    
    if(password===rePassword){
      return null;
    }
    else
    return {mismatch:true};
    
  }

  submitForm():void{
    if(this.registerForm.valid){

      this.isloading=true;
      this.authService.sendRegisterForm(this.registerForm.value).subscribe(
       {
         next:(res)=>{
           console.log(res);
           this.IsSuccess=true;
           setTimeout(() => {
             if(res.message==='success'){
                this.router.navigate(['/login']);
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
    else{
      this.registerForm.markAllAsTouched();
    }
}
}