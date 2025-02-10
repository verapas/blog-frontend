import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

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
export class PostComponent {
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
    tableEditButtons: ['tableHeader', 'tableRows', 'tableColumns', 'tableCells', 'tableStyle', 'tableDelete'],
    quickInsertTags: ['table'],
  };

  savePost() {
    const editorContent = document.querySelector('.fr-view')?.innerHTML || '';
    console.log('Post-Inhalt:', editorContent);
    // this.apiService.savePost(editorContent).subscribe(...);
  }
}
