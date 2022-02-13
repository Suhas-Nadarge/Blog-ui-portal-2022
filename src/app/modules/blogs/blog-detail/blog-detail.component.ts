import { Comments } from './../../../interfaces/comments';
import { ToastrManager } from 'ng6-toastr-notifications';
import { BlogService } from './../../../services/blog.service';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { BlogDetails } from 'src/app/interfaces/blog-details';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  currentBlog ?: BlogDetails; 
  commentForm!: FormGroup
  editCommentForm!: FormGroup
  id : number;
  allComments : any = [];
  current = new Date()
  isLoader = false;
  isEdit = false;
  currentIndex ?: number;
  editComments = new FormArray([]);





  constructor(public router: Router ,public fb: FormBuilder,public toasterService: ToastrManager,public blogService: BlogService) {
    console.log('-'+this.router.getCurrentNavigation()?.extras.state?._id);
    this.id = this.router.getCurrentNavigation()?.extras.state?._id
    this.getAllDetails();
  }
  getAllDetails() {
    this.id ? this.getBlogDetails(this.id) : this.router.navigate(['home/blogs']);
    this.id ? this.getBlogComments(this.id) : this.router.navigate(['home/blogs']);
  }
 
  
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.fb.group({
      comment:['',Validators.required]
    })

    this.editCommentForm = this.fb.group({
      comment:['',Validators.required]
    })
    
  }

  getBlogComments(id: any) {
    this.isLoader = true;
    this.blogService.getAllComments(id).subscribe((resp:any) => {
      this.isLoader = false;
      this.allComments = resp;
      this.allComments.map((rep: any)=>{this.allComments['isEdit'] = false})
      this.allComments =  this.allComments.sort((first: any, second: any) => 0 - (new Date(first.date) >  new Date(second.date) ? 1 : -1));
      });
  }

  getBlogDetails(id: any) {
    this.isLoader = true;
    this.blogService.getBlogDetailsData(id).subscribe((resp:any) => {
    this.isLoader = false;

    this.currentBlog = resp;
    });
    
  }

  findUsername(id: any){
    // console.log(this.allComments.filter((obj: any)=> id === obj.id)[0])
    return this.allComments.filter((obj: any)=> id === obj.id)[0].user
  }

  postComment(){ 
    this.isLoader = true;

    const commentObj: Comments= {
      'user': 'Anonymous',
      'date': new Date().toISOString().slice(0, 10),
      'content': this.commentForm.value.comment,
      'postId': Number(this.currentBlog?.id),
      'parent_id': null
    }
    // this.currentBlog.comments.push(commentObj);
    // const requestObj = this.currentBlog
    this.blogService.addComment(commentObj).subscribe((resp:any) => {
    this.toasterService.successToastr('Comment added successfully!', 'Success',{toastTimeout:6000});
      this.commentForm.reset();
      this.getAllDetails();
    },
    (error: any)=>{
    this.isLoader = false;
    this.toasterService.errorToastr('Something went wrong!', 'Error',{toastTimeout:6000});
    }
    );
  }

  enableEdit(index : number){
    
    this.isEdit = true;

    this.currentIndex =  index;
    this.allComments[index]['isEdit'] = true; 
  }

  updateComment(index: any){
    console.log((<HTMLInputElement>document.getElementById(index)).value)
    this.isEdit = false;
    this.allComments[index]['isEdit'] = false; 
    const commentObj = {
      'user': 'Anonymous',
      'date': new Date().toISOString().slice(0, 10),
      'content': (<HTMLInputElement>document.getElementById(index)).value,
      'postId': Number(this.allComments[index].postId),
      'id':Number(this.allComments[index].id),
      'parent_id': null
    }
    this.blogService.editComment(commentObj).subscribe((resp:any) => {
      this.toasterService.successToastr('Comment updated successfully!', 'Success',{toastTimeout:6000});
        this.commentForm.reset();
        this.getAllDetails();
      },
      (error: any)=>{
      this.isLoader = false;
      this.toasterService.errorToastr('Something went wrong!', 'Error',{toastTimeout:6000});
      }
      );
    }

  navigateToBlogs(): void {
    this.router.navigate(['home/blogs']);
  }
}
