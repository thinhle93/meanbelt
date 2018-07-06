import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AddauthorComponent } from './addauthor/addauthor.component';
import { AddquoteComponent } from './addquote/addquote.component';
import { ViewquotesComponent } from './viewquotes/viewquotes.component';
import { EditauthorComponent } from './editauthor/editauthor.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', component: HomeComponent },
  { path: 'addquote/:id', component: AddquoteComponent },
  { path: 'addauthor', component: AddauthorComponent },
  { path: 'viewquotes/:id', component: ViewquotesComponent },
  { path: 'editauthor/:id', component: EditauthorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
