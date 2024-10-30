import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoEditDialogComponent } from './memo-edit-dialog.component';

describe('MemoEditDialogComponent', () => {
  let component: MemoEditDialogComponent;
  let fixture: ComponentFixture<MemoEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
