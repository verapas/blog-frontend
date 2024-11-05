import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ContentContainerComponent} from './content-container/content-container.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    ContentContainerComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
