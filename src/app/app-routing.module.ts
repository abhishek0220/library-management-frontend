import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PublisherComponent } from './components/publisher/publisher.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'publisher',
    component: PublisherComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
