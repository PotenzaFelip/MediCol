import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Medicol';
  menuOpen: boolean = false; // Variável para controlar o estado do menu
  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeMenu();
  }

}
