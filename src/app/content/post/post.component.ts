import {Component, inject, OnInit} from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {ToastrService} from 'ngx-toastr';
import {PostControllerService, PostEntityControllerService} from '../../openapi-client';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterModule,
    FroalaEditorModule,
    FroalaViewModule
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  private toastr = inject(ToastrService);
  private postEntityControllerService = inject(PostEntityControllerService);
  private PostControllerService = inject(PostControllerService);
  private existingPostContent: string | null = null;

  ngOnInit() {
    this.checkForExistingPost();

  }

  private checkForExistingPost() {
    const today = new Date().toLocaleDateString();
    const todayTitle = `Arbeitsjournal vom ${today}`;

    this.PostControllerService.getPostsByTitle(todayTitle).subscribe({
      next: (posts) => {
        if (posts && posts.length > 0) {
          // Post exists, store its content
          this.existingPostContent = posts[0].content;
          this.toastr.info(`Arbeitsjournal vom ${today} wurde geladen.`);
        }
      },
      error: (err) => {
        console.error('Fehler beim Suchen des Posts:', err);
      }
    });
  }


  // TODO existing post zuerst reinrendern, falls bereits einer vorhanden ist von diesem Tag. Oder ganze logik nochmals überdenken :)))
  public froalaOptions: object = {
    toolbarButtons: [
      'bold', 'italic', 'underline', 'strikeThrough', '|',
      'paragraphFormat', 'align', 'formatOL', 'formatUL', '|',
      'tableHeader', 'tableRows', 'tableColumns', 'tableStyle', '|',
      'insertLink', 'insertImage', '|',
      'undo', 'redo', 'fullscreen'
    ],
    pluginsEnabled: ['table', 'link', 'lists', 'fullscreen'],
    events: {
      'initialized': function(this: any) {
        const editor = this as any;
        if (editor.html.get() === '') {
          const today = new Date().toLocaleDateString();
          const template = `
            <h2>Arbeitsjournal vom ${today}</h2>
            <table style="width: 100%; table-layout: fixed;">
              <thead>
                <tr>
                  <th style="width: 20%;">Tätigkeit</th>
                  <th style="width: 15%;">Dauer</th>
                  <th style="width: 65%;">Fortschritt/Anmerkungen</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="vertical-align: top;"></td>
                  <td style="vertical-align: top;"></td>
                  <td style="vertical-align: top;"></td>
                </tr>
              </tbody>
            </table>
            <h3>Reflexion</h3>
            <p>Schreibe deine Reflexion hier...</p>
          `;
          editor.html.set(template);
        }
      }
    },
    height: 'calc(100% - 90px)',
    tableEditButtons: ['tableHeader', 'tableRows', 'tableColumns', 'tableCells', 'tableStyle', 'tableDelete'],
    quickInsertTags: ['table'],
  };

  savePost() {
    // 1. Editor-Inhalt auslesen
    const editorContent = document.querySelector('.fr-view')?.innerHTML || '';

    // 2. Minimal-Prüfung, ob Inhalt leer ist
    if (!editorContent.trim()) {
      this.toastr.error('Der Post-Inhalt darf nicht leer sein.', 'Fehler');
      return;
    }

    // 3. Mit DOMParser den ersten <h2> aus dem Inhalt auslesen
    const parser = new DOMParser();
    const doc = parser.parseFromString(editorContent, 'text/html');
    const h2Element = doc.querySelector('h2');
    // Falls kein <h2> gefunden wird, verwende einen Standardwert
    const title = h2Element?.textContent?.trim() || 'Ohne Titel';

    // 4. POST-Request an deinen OpenAPI-Service absetzen
    this.postEntityControllerService
      .postCollectionResourcePostPost1({
        title: title,
        content: editorContent
      })
      .subscribe({
        next: (response) => {
          console.log('Post gespeichert:', response);
          this.toastr.success('Post erfolgreich gespeichert!', 'Erfolg');
          // Optional: Editor leeren oder zu einer anderen Seite navigieren
        },
        error: (err) => {
          console.error('Fehler beim Speichern des Posts:', err);
          this.toastr.error('Fehler beim Speichern des Posts.', 'Fehler');
        }
      });
  }
}
