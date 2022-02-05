import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogHomeComponent } from './blog-home/blog-home.component';

const routes: Routes = [{
  path: 'home',
  component: BlogHomeComponent
},
{
  path: 'view/:id',
  component: BlogDetailComponent
}
,{
  path: '',
  component: BlogHomeComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule {
  
 }
