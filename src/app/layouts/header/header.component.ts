import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showOption: boolean = false;

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToBlogs(): void {
    this.router.navigate(['home/blogs']);
  }

  logOut(): void {
    this.router.navigate(['users/login']);
  }

}
