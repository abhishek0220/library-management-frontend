import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { NavComponent } from './components/admin/nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PublisherComponent,
    HomeComponent,
    SidebarComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
