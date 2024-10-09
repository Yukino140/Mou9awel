import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../elements/header/header.component';
import { FooterComponent } from '../../elements/footer/footer.component';
import { ContentComponent } from '../../elements/content/content.component';

@Component({
  selector: 'app-client-space',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ContentComponent,RouterModule],
  templateUrl: './client-space.component.html',
  styleUrl: './client-space.component.css'
})
export class ClientSpaceComponent {

}
