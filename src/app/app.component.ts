import { Breadcrumb } from './../../node_modules/xng-breadcrumb/lib/types.d';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import{NgxSpinnerComponent} from 'ngx-spinner'
import { BreadcrumbComponent} from 'xng-breadcrumb';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent, BreadcrumbComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
