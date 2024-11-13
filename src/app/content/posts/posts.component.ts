import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Quill from 'quill';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, AfterViewInit {
  @ViewChild('editor', { static: true }) editorElement!: ElementRef;
  public quill: Quill | undefined;

  ngOnInit() {
    // Quill-Initialisierung ist in ngAfterViewInit
  }

  ngAfterViewInit() {
    this.quill = new Quill(this.editorElement.nativeElement, {
      theme: 'snow'
    });
  }
}
