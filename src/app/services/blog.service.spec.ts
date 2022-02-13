import { TestBed } from '@angular/core/testing';

import { BlogService } from './blog.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';



    describe('TestService', () => {

      let httpMock: HttpTestingController;
      let blogService: BlogService;
    
      beforeEach(() => {
    
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ BlogService ]
        });
    
        blogService = TestBed.get(BlogService);
        httpMock = TestBed.get(HttpTestingController);
    
      });
    
      it('getBlogListData() should http GET names', () => {
    
        const resp = [{"id": 1,
        "title": "Blog post #1",
        "author": "Melissa Manges",
        "publish_date": "2016-02-23",
        "slug": "blog-post-1",
        "description": "desc",
        "content": "content"
      }];
    
        blogService.getBlogListData().subscribe((res: any) => {
          expect(res).toEqual(resp);
        });
    
        const req = httpMock.expectOne('http://localhost:9000/posts');
        expect(req.request.method).toEqual("GET");
        req.flush(resp);
    
        httpMock.verify();
      });
    
    });