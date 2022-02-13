import { BlogService } from './../../../services/blog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ng6-toastr-notifications';
import { of } from 'rxjs';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";

import { BlogHomeComponent } from './blog-home.component';

describe('BlogHomeComponent', () => {
  let component: BlogHomeComponent;
  let fixture: ComponentFixture<BlogHomeComponent>;
  const RouterSpy = jasmine.createSpyObj(
    'Router',
    ['navigate']
  );

  const ActivatedRouteSpy = {
    snapshot: {
      paramMap: convertToParamMap({
        some: 'some',
        else: 'else',
      })
    },
    queryParamMap: of(
      convertToParamMap({
        some: 'some',
        else: 'else',
      })
    )
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogHomeComponent ],imports:[RouterTestingModule, ReactiveFormsModule,HttpClientTestingModule, ToastrModule.forRoot()  ],
      providers: [
        { provide: ActivatedRoute,   useValue: ActivatedRouteSpy    },
        { provide: Router,           useValue: RouterSpy            }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBlogList and get response as empty array', fakeAsync(() => {
    const fixture = TestBed.createComponent(BlogHomeComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(BlogService);
    let spy_getPosts = spyOn(service, 'getBlogListData').and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.getBlogList();
    tick(100);
    expect(component.bloglist).toEqual([]);
  })) 

  it('should call getBlogList and get response as array', fakeAsync(() => {
    const fixture = TestBed.createComponent(BlogHomeComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(BlogService);
    let spy_getPosts = spyOn(service,"getBlogListData").and.callFake(() => {
      return Rx.of([{
        "id": 1,
        "title": "Blog post #1",
        "author": "Melissa Manges",
        "publish_date": "2016-02-23",
        "slug": "blog-post-1",
        "description": "Utroque denique invenire et has.",
        "content": "<p>Utroque denique invenire et has. Cum case definitiones no, est dicit placerat verterem ne.</p> <p>In ius nonumy perfecto adipiscing, ad est cibo iisque aliquid, dicit civibus eum ei. Cum animal suscipit at, utamur utroque appareat sed ex.</p>"
      }]).pipe(delay(2000));
    });
    component.getBlogList();
    tick(1000);
    expect(component.isLoader).toEqual(true);
    tick(1000);
    expect(component.isLoader).toEqual(false);
    
    console.log('---'+JSON.stringify(component.bloglist));
    expect(component.bloglist[0].author).toEqual('Melissa Manges');
  }))

});
