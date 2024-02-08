import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      RouterModule.forRoot(routes),
      BrowserAnimationsModule
    ])
  ]
}).catch(err => console.error(err));