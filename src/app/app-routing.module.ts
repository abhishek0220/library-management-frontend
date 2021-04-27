import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
