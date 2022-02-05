import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  currentBlog : any = {}

  constructor(public router: Router) {
    console.log(this.router.getCurrentNavigation()?.extras.state?.blogData);
    this.currentBlog = this.router.getCurrentNavigation()?.extras.state?.blogData
  }
  ngOnInit(): void {
  }

}
