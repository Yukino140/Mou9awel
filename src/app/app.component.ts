import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./elements/header/header.component";
import { FooterComponent } from "./elements/footer/footer.component";
import { ContentComponent } from "./elements/content/content.component";
import { ClientSpaceComponent } from "./Client/client-space/client-space.component";
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { FormBuilder,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { OverviewComponent } from './Admin/components/overview/overview.component';
import { AnalyticsComponent } from './Admin/components/analytics/analytics.component';
import { ReportsComponent } from './Admin/components/reports/reports.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TakeTestComponent } from './elements/content/take-test/take-test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ContentComponent, RouterModule, ClientSpaceComponent,AdminLoginComponent,ReactiveFormsModule,DashboardComponent,OverviewComponent,AnalyticsComponent,ReportsComponent,HttpClientModule,TakeTestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stage';


}
