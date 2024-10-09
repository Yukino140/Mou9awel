import { Routes } from '@angular/router';
import { RevoirTestComponent } from './elements/content/revoir-test/revoir-test.component';
import { AproposComponent } from './elements/content/apropos/apropos.component';
import { TakeTestComponent } from './elements/content/take-test/take-test.component';
import { ClientSpaceComponent } from './Client/client-space/client-space.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { OverviewComponent } from './Admin/components/overview/overview.component';
import { ReportsComponent } from './Admin/components/reports/reports.component';
import { AnalyticsComponent } from './Admin/components/analytics/analytics.component';
import { AddResponceComponent } from './Admin/components/add-responce/add-responce.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Client/test', pathMatch: 'full' },
    {path:"Client", component:ClientSpaceComponent,
        children: [
            {
                path:'revoir-test',
                component:RevoirTestComponent
            },
            {
                path:'a-propos',
                component:AproposComponent
            },
            {
                path:'test',
                component:TakeTestComponent
            }
        ]
    }
    ,
    {
        path:'Login',
        component:AdminLoginComponent
    },
    
  {
        path:'Dashboard',
        component:DashboardComponent,
        children:[
        
            { path: 'overview', component: OverviewComponent },
            { path: 'reports', component: ReportsComponent },
            { path: 'analytics', component: AnalyticsComponent },
            {path:'newReponces/:id',component:AddResponceComponent}
           // { path: '', redirectTo: '/overview', pathMatch: 'full' }
     
  ]}
           
        
    
];
