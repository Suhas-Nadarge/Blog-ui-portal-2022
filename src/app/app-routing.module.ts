import { BlogsModule } from './modules/blogs/blogs.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';




const routes: Routes = [
  {
        path: 'users',
        loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
       },
  {
        path: 'blogs',
        loadChildren: () => import('./modules/blogs/blogs.module').then(m => m.BlogsModule)
       }
    ,
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
