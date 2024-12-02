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
}
