import { MyTranslateService } from './../../core/services/MyTranslate/my-translate.service';
import { Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  constructor(private flowbiteService: FlowbiteService) { }
  
  currentLang:string=localStorage.getItem("lang")!;
 isLogin=input<boolean>(true);
 ishidden:string='';
 numberCount:Signal<number>= computed(()=> this.cartService.cartNumber() )    ;
 readonly authService=inject(AuthService);
 private readonly myTranslateService=inject(MyTranslateService);
 private readonly cartService=inject(CartService);


  ngOnInit(): void {
 initFlowbite();
 this.cartService.getLoggedUserCart().subscribe({

  next:(res)=>{
    this.cartService.cartNumber.set(res.numOfCartItems);
  }
 })
 
  }








change(lang:string){
  this.myTranslateService.changeLang(lang);
  if(lang==='en'){
    this.currentLang='en';
  }
  else{
    this.currentLang='ar'
  }
}

logOutAlert(el:HTMLDivElement){
  el.classList.remove('hidden');

}

dismiss(el:HTMLDivElement){
  el.classList.add('hidden');

}
}
