// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from './app/shared/shared.module';

import { appRoutingProviders } from './app/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [
    appRoutingProviders,
    importProvidersFrom(
      BrowserAnimationsModule,
      RouterModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatRadioModule,
      MatButtonModule,
      MatCardModule,
      SharedModule

    )
  ]
}).catch(err => console.error(err));
