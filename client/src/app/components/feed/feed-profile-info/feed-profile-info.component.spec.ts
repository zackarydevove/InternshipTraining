import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedProfileInfoComponent } from './feed-profile-info.component';

describe('FeedProfileInfoComponent', () => {
  let component: FeedProfileInfoComponent;
  let fixture: ComponentFixture<FeedProfileInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedProfileInfoComponent]
    });
    fixture = TestBed.createComponent(FeedProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
