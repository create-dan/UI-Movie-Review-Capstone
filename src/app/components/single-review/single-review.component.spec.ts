import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReviewComponent } from './single-review.component';

describe('SingleReviewComponent', () => {
  let component: SingleReviewComponent;
  let fixture: ComponentFixture<SingleReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleReviewComponent]
    });
    fixture = TestBed.createComponent(SingleReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
