import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  today: any = new Date().toLocaleString('en-US');

  constructor() { }

  ngOnInit(): void {
  }

}
