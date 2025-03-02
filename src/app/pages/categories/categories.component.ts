import { NgxSpinner, NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { ICategory } from '../../shared/interfaces/icategory';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  private readonly ngxSpinnerService=inject(NgxSpinnerService)

 private readonly categoriesService =inject(CategoriesService);
 categories:ICategory[]=[];
 ngOnInit(): void {
   this.getAllCats();
 }

 getAllCats():void{
  this.ngxSpinnerService.show("CartLoad");

  this.categoriesService.getAllCategories().subscribe(

      {
        next:(res)=>{
          this.categories=res.data;
          this.ngxSpinnerService.hide("CartLoad");
        },

        error:(err)=>{
          console.log(err);
          this.ngxSpinnerService.hide("CartLoad");
        }
      }

  )


 }

}
