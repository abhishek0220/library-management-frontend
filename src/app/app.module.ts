import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { NavComponent } from './components/admin/nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RentalComponent } from './components/rental/rental.component';
import { ReaderComponent } from './components/reader/reader.component';
import { LoginComponent } from './components/login/login.component';
import { BookComponent } from './components/book/book.component';
import { AddBooksComponent } from './components/add-books/add-books.component';

@NgModule({
  declarations: [
    AppComponent,
    PublisherComponent,
    HomeComponent,
    SidebarComponent,
    NavComponent,
    RentalComponent,
    ReaderComponent,
    LoginComponent,
    BookComponent,
    AddBooksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
