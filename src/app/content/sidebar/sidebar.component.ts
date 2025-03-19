// sidebar.component.ts
import {Component, inject} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, NgClass, NgOptimizedImage],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  router = inject(Router);
  cookieService = inject(CookieService);

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.isMenuOpen = false;
  }

  logout(route: string): void {
    // Entferne den Token-Cookie (achte auf den richtigen Pfad)
    this.cookieService.delete('JOURNALIX_ACCESS_TOKEN', '/');
    // Navigiere zur Login-Seite
    this.router.navigate([route]);
  }
}
