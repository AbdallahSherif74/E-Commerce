import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Ibrands } from '../../shared/interfaces/ibrands';
import { NgxSpinnerService } from 'ngx-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  private readonly brandsService=inject(BrandsService);
  private readonly ngxSpinnerService=inject(NgxSpinnerService);
  brands:Ibrands[]=[];

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands():void{
    this.ngxSpinnerService.show("CartLoad");
    this.brandsService.getAllBrands().subscribe({

      next:(res)=>{
        this.ngxSpinnerService.hide("CartLoad");
        this.brands=res.data;
        console.log(res.data);
      }



    })




  }


}
