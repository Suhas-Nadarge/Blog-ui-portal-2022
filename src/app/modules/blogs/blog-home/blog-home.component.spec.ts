import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ng6-toastr-notifications';
import { of } from 'rxjs';

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
});
