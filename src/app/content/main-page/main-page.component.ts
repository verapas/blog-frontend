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


  public froalaOptions: object = {
    toolbarButtons: [
      'bold', 'italic', 'underline', '|',
      'insertTable', 'tableHeader', 'tableRows', '|',
      'undo', 'redo'
    ],
    events: {
      'initialized': function(this: any) {
        const editor = this as any;

        if (editor.html.get() === '') {
          const today = new Date().toLocaleDateString();
          const template = `
<h2 style="margin-top: 0;">Arbeitsjournal vom ${today}</h2>
  <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
    <thead>
      <tr>
        <th style="text-align: left; vertical-align: top; padding: 8px; border: 1px solid #ddd;">
          Tätigkeit
        </th>
        <th style="text-align: left; vertical-align: top; padding: 8px; border: 1px solid #ddd;">
          Dauer
        </th>
        <th style="text-align: left; vertical-align: top; padding: 8px; border: 1px solid #ddd;">
          Fortschritt/Anmerkungen
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align: left; vertical-align: top; padding: 8px; border: 1px solid #ddd;"></td>
        <td style="text-align: left; vertical-align: top; padding: 8px; border: 1px solid #ddd;"></td>
        <td style="text-align: left; vertical-align: top; padding: 8px; border: 1px solid #ddd;"></td>
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
    tableEditButtons: ['tableRows', 'tableColumns', 'tableCells', 'tableDelete'],
    quickInsertTags: ['table'],
  };
  savePost() {
    // Hole den Inhalt des Froala-Editors
    const editorContent = document.querySelector('.fr-view')?.innerHTML || '';
    console.log('Post-Inhalt:', editorContent);


    // Hier kannst du den Inhalt an eine API senden:
    // this.apiService.savePost(editorContent).subscribe(...);
  }
}
