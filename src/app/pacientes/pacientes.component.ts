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
  constructor(private location: Location,private router: Router){}

  goBack(): void {
    this.location.back();  // Navega para a página anterior
  }
    // Navega para a rota especificada
    navigateTo(route: string): void {
      this.router.navigate([route]);
    }
}
