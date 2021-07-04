import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { DetecttionPageComponent } from './detecttion-page/detecttion-page.component';
const routes: Routes = [{path:'',component:DetecttionPageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
