import {Component} from '@angular/core';
import {HeaderComponent} from '../../header/header.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
import {FroalaEditorModule} from 'angular-froala-wysiwyg';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterModule,
    FroalaEditorModule
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  public lastEntry: string | null = null; // Platzhalter für den letzten Eintrag

  constructor() {
    // Später: Hier den letzten gespeicherten Eintrag aus dem Backend holen
    this.lastEntry = localStorage.getItem('lastEntry') || null;
  }
}
