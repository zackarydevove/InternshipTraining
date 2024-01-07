import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeMoreCommentsComponent } from './see-more-comments.component';

describe('SeeMoreCommentsComponent', () => {
  let component: SeeMoreCommentsComponent;
  let fixture: ComponentFixture<SeeMoreCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeMoreCommentsComponent]
    });
    fixture = TestBed.createComponent(SeeMoreCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
