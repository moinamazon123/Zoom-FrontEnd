import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatBadgeModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';



if (environment.production) {
  enableProdMode();
}



platformBrowserDynamic().bootstrapModule(AppModule);
