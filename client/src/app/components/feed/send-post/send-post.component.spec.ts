import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPostComponent } from './send-post.component';

describe('SendPostComponent', () => {
  let component: SendPostComponent;
  let fixture: ComponentFixture<SendPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendPostComponent]
    });
    fixture = TestBed.createComponent(SendPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
