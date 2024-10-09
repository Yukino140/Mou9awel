import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientSpaceComponent } from "../../Client/client-space/client-space.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterOutlet, ClientSpaceComponent, HeaderComponent, FooterComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

}
