import {Component, inject} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  toastr = inject(ToastrService);

}
