import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMovieComponent } from './single-movie.component';

describe('SingleMovieComponent', () => {
  let component: SingleMovieComponent;
  let fixture: ComponentFixture<SingleMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleMovieComponent]
    });
    fixture = TestBed.createComponent(SingleMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
