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
            <h2>Arbeitsjournal vom ${today}</h2>
            <table style="width: 100%;">
              <thead>
                <tr>
                  <th>Tätigkeit</th>
                  <th>Dauer</th>
                  <th>Fortschritt/Anmerkungen</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
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
