import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomAddComponent } from './random-add.component';

describe('RandomAddComponent', () => {
  let component: RandomAddComponent;
  let fixture: ComponentFixture<RandomAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandomAddComponent]
    });
    fixture = TestBed.createComponent(RandomAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
