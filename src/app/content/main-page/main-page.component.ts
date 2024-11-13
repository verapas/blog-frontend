import {Component} from '@angular/core';
import {HeaderComponent} from '../../header/header.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterModule
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}