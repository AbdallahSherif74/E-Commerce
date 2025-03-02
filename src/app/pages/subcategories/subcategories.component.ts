import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SubcategoriesService } from '../../core/services/subcategories/subcategories.service';
import { Isub } from '../../shared/interfaces/isub';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-subcategories',
  imports: [RouterLink],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss'
  
})
export class SubcategoriesComponent implements OnInit{
 
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly subcategoriesService = inject(SubcategoriesService);
   
   private readonly ngxSpinnerService=inject(NgxSpinnerService);
  id:string='';
  name:string='';
  subcategories:Isub[]=[];
  ngOnInit(): void {
   this.displaySubCats()
  }

  displaySubCats():void{
    this.ngxSpinnerService.show('CartLoad');
    this.activatedRoute.paramMap.subscribe({


      next:(res)=>{
        this.id=res.get("id")!;
        this.name =res.get('name')!;
        this.subcategoriesService.getAllSubcats().subscribe({
          next:(res)=>{
            console.log(res.data);
            this.subcategories=res.data;
            this.ngxSpinnerService.hide('CartLoad');
          }

        })

      }
    })
  }


}
