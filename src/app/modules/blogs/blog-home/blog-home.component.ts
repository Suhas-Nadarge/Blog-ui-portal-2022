import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { mockData } from 'src/app/constant';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.scss']
})
export class BlogHomeComponent implements OnInit {

  bloglist = mockData.posts
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  navigateToDetail(obj: any): any{
    this.router.navigate(['blogs/view'],{ state: { blogData: obj } });
  }
}
