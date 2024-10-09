import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CardComponent } from '../card/card.component';
import { HeaderComponent } from '../header/header.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent,CardComponent,HeaderComponent,RouterOutlet,NgClass,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  isSidebarOpen = false;

  // Function to toggle sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('hello')
  }

}
