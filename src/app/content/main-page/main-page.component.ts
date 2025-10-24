import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {PostControllerService, PostEntityControllerService, PostShowDto} from "../../openapi-client";
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    RouterModule,
    FroalaEditorModule,
    FroalaViewModule
],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  public lastEntry: SafeHtml | null = null;
  public entryDate: string = '';

  constructor(
    private postService: PostControllerService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadLastPost();
  }

  /**
   * Lädt den letzten Beitrag des angemeldeten Benutzers
   */
  loadLastPost() {
    this.postService.getLatestPost().subscribe({
      next: (post: PostShowDto) => {
        console.log('Letzter Post:', post);

        // Inhalt des Posts setzen und als sicher markieren
        if (post.content) {
          this.lastEntry = this.sanitizer.bypassSecurityTrustHtml(post.content);
        } else {
          this.lastEntry = null;
        }

        // Datum formatieren, falls vorhanden
        if (post.createdAt) {
          this.formatEntryDate(new Date(post.createdAt));
        } else {
          this.formatEntryDate();
        }
      },
      error: (err) => {
        console.error('Fehler beim Laden des letzten Beitrags:', err);
        this.lastEntry = null;
        this.formatEntryDate(); // Aktuelles Datum als Fallback
      }
    });
  }

  /**
   * Formatiert das Datum des letzten Eintrags
   */
  formatEntryDate(date: Date = new Date()) {
    const day = date.getDate();
    const month = date.toLocaleString('de-DE', { month: 'long' });
    const year = date.getFullYear();
    this.entryDate = `${day}. ${month} ${year}`;
  }
}
