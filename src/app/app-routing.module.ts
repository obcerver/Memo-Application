import { ListComponent } from './memo-home/list/list.component';
import { MemoHomeComponent } from './memo-home/memo-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'memo-home', component: MemoHomeComponent},
  { path: 'memo-list', component: ListComponent},
  {
    path: '',
    redirectTo: '/memo-home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

