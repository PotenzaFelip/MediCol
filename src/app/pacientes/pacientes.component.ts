import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacientes',
  imports: [],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent {
  origem: string = "paciente";
  constructor(private location: Location,private router: Router){}

  goBack(): void {
    this.location.back();
  }
    navigateTo(route: string): void {
      this.router.navigate([route],{queryParams:{origem:this.origem}});
    }
}
