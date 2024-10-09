import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HeaderComponent } from './app/elements/header/header.component';
import { FooterComponent } from './app/elements/footer/footer.component';
import { ContentComponent } from './app/elements/content/content.component';
import { ClientSpaceComponent } from './app/Client/client-space/client-space.component';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AdminLoginComponent } from './app/Admin/admin-login/admin-login.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
