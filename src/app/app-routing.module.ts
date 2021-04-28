import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBooksComponent } from './components/add-books/add-books.component';
import { BookComponent } from './components/book/book.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import { ReaderComponent } from './components/reader/reader.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'publisher',
    component: PublisherComponent
  },
  {
    path:'rental',
    component: RentalComponent
  },
  {
    path:'reader',
    component: ReaderComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'book',
    component: BookComponent
  },
  {
    path:'addBooks',
    component: AddBooksComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
