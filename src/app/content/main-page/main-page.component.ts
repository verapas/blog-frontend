import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../header/header.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
import {FroalaEditorModule} from 'angular-froala-wysiwyg';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterModule,
    FroalaEditorModule,
    NgClass
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  public lastEntry: string | null = null; // Platzhalter für den letzten Eintrag
  public entryDate: string = '';

  constructor() {
    // Später: Hier den letzten gespeicherten Eintrag aus dem Backend holen
    this.lastEntry = localStorage.getItem('lastEntry') || null;
  }

  ngOnInit() {

    // Datum für den letzten Eintrag formatieren
    this.formatEntryDate();
  }

  /**
   * Formatiert das Datum des letzten Eintrags
   * Später durch tatsächliches Datum aus dem Backend ersetzen
   */
  formatEntryDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('de-DE', { month: 'long' });
    const year = today.getFullYear();
    this.entryDate = `${day}. ${month} ${year}`;
  }
}
