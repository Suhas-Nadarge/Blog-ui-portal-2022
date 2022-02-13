import { ActivatedRoute, convertToParamMap, Router, RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailComponent } from './blog-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BlogDetailComponent', () => {
  let component: BlogDetailComponent;
  let fixture: ComponentFixture<BlogDetailComponent>;

  const RouterSpy = jasmine.createSpyObj(
    'Router',
    ['navigate','getCurrentNavigation']
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
      declarations: [ BlogDetailComponent ],
      imports:[RouterTestingModule, ReactiveFormsModule, ToastrModule.forRoot(), HttpClientTestingModule  ],
      providers: [
        { provide: ActivatedRoute,   useValue: ActivatedRouteSpy    },
        { provide: Router,           useValue: RouterSpy            }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should post comment to the blog', () => {
    component.allComments = [];
    component.allComments.push(
      {'user': 'Anonymous',
    'date': new Date().toISOString().slice(0, 10),
    'content': 'content',
    'postId': 0,
    'parent_id': null}
)
    fixture.detectChanges();

    component.postComment();
    fixture.detectChanges();

    const expectedObj = [{
      'user': 'Anonymous',
      'date': new Date().toISOString().slice(0, 10),
      'content': 'content',
      'postId': 0,
      'parent_id': null

    }]

    expect(component.allComments).toEqual(expectedObj);
  });
});
