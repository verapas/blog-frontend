import { Component } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import 'froala-editor/js/plugins/table.min.js'; // Tabellen-Plugin importieren

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [FroalaEditorModule],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
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
}
