import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from "./content/sidebar/sidebar.component";


@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blog-frontend';

  isRegistering = false;

  toggleRegisterMode(): void {
    this.isRegistering = !this.isRegistering;
  }
}
