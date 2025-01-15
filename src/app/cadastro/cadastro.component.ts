import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  constructor(private location: Location, private router: Router) {}

  goBack(): void {
    this.location.back();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
