import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoHomeComponent } from './memo-home.component';

describe('MemoHomeComponent', () => {
  let component: MemoHomeComponent;
  let fixture: ComponentFixture<MemoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
