import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicos',
  imports: [],
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.css'
})
export class MedicosComponent {
  constructor(private location: Location,private router: Router){}
  origem: string = "medico";

  goBack(): void {
    this.location.back();
  }

    navigateTo(route: string): void {
      console.log(route);
      this.router.navigate([route],{queryParams:{origem:this.origem}});
    }
}
