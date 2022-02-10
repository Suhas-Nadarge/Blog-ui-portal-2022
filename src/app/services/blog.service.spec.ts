import { TestBed } from '@angular/core/testing';

import { BlogService } from './blog.service';

// describe('BlogService', () => {
//   let service: BlogService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(BlogService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';


describe('myService', () => {

      beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], 
        providers: [BlogService]
      }));

       it('should be created', () => {
        const service: BlogService = TestBed.get(BlogService);
        expect(service).toBeTruthy();
       });

       it('should have getBlogListData function', () => {
        const service: BlogService = TestBed.get(BlogService);
        expect(service.getBlogListData).toBeTruthy();
       });

    });
