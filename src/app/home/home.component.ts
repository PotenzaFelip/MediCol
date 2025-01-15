import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private location: Location, private router: Router) {}

  // Navega para a página anterior
  goBack(): void {
    this.location.back();
  }

  // Navega para a rota especificada
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
