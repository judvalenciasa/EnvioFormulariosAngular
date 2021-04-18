import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelComponent } from './componentes/model/model.component';
import { TemplateComponent } from './componentes/template/template.component';


const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/model'
  },
  {
    path:'template',
    component:TemplateComponent
  },
  {
    path:'model',
    component:ModelComponent
  },
  {
    path:'**',
    redirectTo:'model'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
