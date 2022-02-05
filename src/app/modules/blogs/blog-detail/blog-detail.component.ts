import { comments } from './../../../constant';
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  currentBlog : any = {}
  commentForm!: FormGroup
  id : any
  current = new Date()
  constructor(public router: Router, public fb: FormBuilder, public blogService: BlogService) {
    console.log('-'+this.router.getCurrentNavigation()?.extras.state?._id);
    this.id = this.router.getCurrentNavigation()?.extras.state?._id
    this.id ? this.getBlogDetails(this.id) : this.router.navigate(['home/blogs']);
    
    }
  
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.fb.group({
      comment:['',Validators.required]
    })
    
  }
  getBlogDetails(id: any) {
    this.blogService.getBlogDetailsData(id).subscribe((resp:any) => {
    this.currentBlog = resp.data;
    });
    
  }

  postComment(){ 
    const commentObj = {
      'username': 'Anonymous',
      'date': new Date().toISOString(),
      'desc': this.commentForm.value.comment
    }
    this.currentBlog.comments.push(commentObj);
    const requestObj = this.currentBlog
    this.blogService.addComment(requestObj).subscribe((resp:any) => {
      alert('check db')
    });
  }

  navigateToBlogs(): void {
    this.router.navigate(['home/blogs']);
  }
}
