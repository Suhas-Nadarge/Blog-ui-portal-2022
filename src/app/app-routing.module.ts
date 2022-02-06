import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes = [
 
  {
    path: 'home',
    loadChildren: () => import('./layouts/home/home.module').then(m => m.HomeModule),
    data: { preload: true, name: 'default' }
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
