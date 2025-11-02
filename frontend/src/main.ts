import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/shared/interceptors/auth.interceptor';

providers: [
  provideHttpClient(withInterceptors([authInterceptor]))
]

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
