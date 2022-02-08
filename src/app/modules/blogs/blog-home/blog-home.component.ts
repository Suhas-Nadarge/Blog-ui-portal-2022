import { ToastrManager } from 'ng6-toastr-notifications';
import { BlogService } from './../../../services/blog.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { mockData } from 'src/app/constant';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.scss']
})
export class BlogHomeComponent implements OnInit {

  bloglist: any = [];
  isLoader =  false;
  constructor(public router: Router, public toasterService: ToastrManager,public blogService: BlogService) { }

  ngOnInit(): void {
    this.getBlogList();
  }
  getBlogList() {
    this.isLoader = true;
    this.blogService.getBlogListData().subscribe((data:any) => {
    this.isLoader = false;

    this.bloglist = data;
    this.filterBy({value:'new'});
    },
    (error)=>{
    this.isLoader = false;
    this.toasterService.errorToastr('Something went wrong!', 'Error',{toastTimeout:6000});

    }
    );
    
  }

  filterBy(evt: any){
    const flag = evt.value;
    if(flag === 'new'){
      this.bloglist = this.bloglist.sort((first: any, second: any) => 0 - (new Date(first.publish_date) > new Date(second.publish_date) ? 1 : -1));
    } else {
      this.bloglist = this.bloglist.sort((first: any, second: any) => 0 - (new Date(first.publish_date) < new Date(second.publish_date) ? 1 : -1));
    }

  }

  navigateToDetail(obj: any): any{
    // this.router.navigate(['home/blogs/view''
    this.router.navigate([`home/view/${btoa(obj.id)}`],{ state: { _id: obj.id } });
  }
}
