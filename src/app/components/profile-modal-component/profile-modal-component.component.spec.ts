import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModalComponentComponent } from './profile-modal-component.component';

describe('ProfileModalComponentComponent', () => {
  let component: ProfileModalComponentComponent;
  let fixture: ComponentFixture<ProfileModalComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileModalComponentComponent]
    });
    fixture = TestBed.createComponent(ProfileModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
