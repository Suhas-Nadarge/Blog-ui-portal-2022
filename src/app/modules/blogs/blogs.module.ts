import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BlogHomeComponent,
    BlogDetailComponent
     
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    ReactiveFormsModule
  ]
})
export class BlogsModule { }

