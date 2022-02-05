import { BlogsModule } from './modules/blogs/blogs.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./layouts/home/home.module').then(m => m.HomeModule),
    data: { preload: true, name: 'default' }
  },
  {
    path: '**',
    redirectTo: 'users/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
